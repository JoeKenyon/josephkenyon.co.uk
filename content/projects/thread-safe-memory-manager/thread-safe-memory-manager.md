---
title: "Thread-Safe Memory Manager"
description: "A bare-metal C memory allocator featuring boundary-tag mechanics and pluggable allocation algorithms."
---
For this project, I built a custom heap memory manager in C from scratch to see exactly how pointer geometry, memory allocation, and thread safety work under the hood. Instead of relying on `malloc` and `free`, this system runs on its own pre-allocated memory buffer and handles tracking, block splitting, and neighbor merging manually.

## The Memory Layout

Instead of managing a separate master spreadsheet or lookup table to see what memory is free or full, this system keeps tracking data directly inside the heap. Every chunk of memory is preceded by a struct (`struct node_t`) that contains the size of the block, whether it is currently free, and pointers to its neighbors.

``` c
struct node_t
{
  struct node_t* next;
  struct node_t* prev;
  unsigned       free;
  size_t         size;
  uint8_t        memory[];
};
```

Because the tracking struct is glued right to the front of the user's data block, reclaiming memory during `deallocate()` is a fast O(1) operation. The system takes the user's data pointer, steps backward in memory by the width of the struct, and instantly reads the metadata.

``` c
// memory is a pointer to the data so recover the header
struct node_t* p = ((struct node_t*)memory) - 1;
```

The entire heap acts as a standard **doubly linked list** of these blocks.

## Allocation Strategies

When initializing the allocator, you pass in a configuration string to choose how the system hunts for empty space. The code maps that choice to a function pointer, making it easy to swap algorithms.

``` c
if (!algorithm || strcmp(algorithm, FIRSTFIT) == 0)
{
  allocate = allocate_first_fit;
}
else if (strcmp(algorithm, NEXTFIT) == 0)
{
  allocate = allocate_next_fit;
}
```

Each strategy uses the doubly linked list differently:

- **First-Fit:** Uses the first free memory block that meets our size requirements.
- **Next-Fit:** Like **first-fit**, but starts at the last used memory segment.
- **Best-Fit:** Uses the smallest possible memory block that fits our size requirements.
- **Worst-Fit:** Uses the largest possible memory block that fits our size requirements.

### How Blocks Are Split
When a suitable free block is found, the allocator decides whether to split that block in two or just hand the whole thing over. To do this, it calculates the leftover space after carving out the user's requested bytes:

``` c
// calculate memory left over after allocation
size_t remaining = p->size - bytes;
```

A split is only allowed if that leftover space is large enough to hold both a new node header (struct node_t) and a viable payload block (MINIMUM_FREE_BLOCK, which I set to 32 bytes):

``` c
if (remaining >= sizeof(struct node_t) + MINIMUM_FREE_BLOCK)
{
    // create a new node with the remaining memory
    struct node_t* node = create_node(&p->memory[bytes], remaining);

    //update next and previous pointers for the new/current node
    node->next = p->next;
    node->prev = p;

    if (node->next)
        node->next->prev = node;

    p->next = node;
    p->size = bytes;
}
```

If it passes the check, the allocator chops the block down. It creates a brand new free node out of the leftover space, hooks it into the doubly linked list, marks the original block as occupied, and returns a pointer directly to its memory[] array.

If it fails the check, the allocator decides that splitting the block would leave behind a tiny, useless sliver of memory. It skips the split completely, marks the entire oversized block as occupied, and hands it over to the user.

## Fragmentation

If you allocate and free random sizes of memory over time, the heap quickly turns into a checkerboard of tiny, isolated blocks that are too small to hold anything useful. 

To prevent this, the `deallocate()` component handles active neighbor merging:

- As soon as a block is freed, the system looks at its neighbor to the left (`prev`). If it's free, they are welded into a single larger node.

``` c
if (p->prev && p->prev->free)
{
    if (next_node == p)
        next_node = p->next;

    p = merge_prev(p);
}
```

- It then looks at the neighbor to the right (`next`). If that block is also free, the current node absorbs it too.

``` c
if (p->next && p->next->free)
{
    if (next_node == p->next)
        next_node = p->next->next;

    merge_next(p);
}
```

By merging empty neighbors back together, the system cleans up after itself and restores large chunks of contiguous space automatically.

``` c
static struct node_t* merge_next(struct node_t* p)
{
  assert(p);

  // Absorb the tracking header size + the actual payload capacity of the next node
  p->size += sizeof(struct node_t) + p->next->size;
  p->next = p->next->next;

  if (p->next)
    p->next->prev = p;

  return p;
}
```

## Multi-Threaded Synchronization

Because splitting blocks, updating pointers, and merging neighbors requires changing multiple linked list references at once, the allocator would corrupt instantly if two threads tried to modify it at the exact same time.

To ensure absolute thread safety, the system implements a global mutual exclusion lock (POSIX mutex).
``` c
// So it doesn't screw up when using threads.
pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;
```
Whenever someone messes with the memory e.g.  allocation, deallocation, the thread must acquire a lock before touching the linked list and release it immediately after. This forces threads to line up and execute memory operations atomically.

``` c
void* allocate_first_fit(size_t bytes)
{
    pthread_mutex_lock(&lock);
  
    // ...

    // check its avavilable and we have room to allocate memory
    if (p->free && p->size >= bytes)
    {
        allocate_node(p, bytes);
        pthread_mutex_unlock(&lock);
        return p->memory;
    }

    // ...

    // release if allocation fails
    pthread_mutex_unlock(&lock); 
    return NULL;
}
```