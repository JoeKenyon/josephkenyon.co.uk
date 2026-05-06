import { getCollection, type CollectionKey } from 'astro:content';

/**
 * Reusable helper to generate static paths for any collection
 * @param collectionName - The name of the collection (e.g., 'projects')
 */
export async function getCollectionPaths<T extends CollectionKey>(collectionName: T)
{
    const entries = await getCollection(collectionName);
    return entries.map((entry) => ({
        params: { slug: entry.id },
        props: entry,
    }));
}