import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
	loader: glob({ base: './src/content/projects/.', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) => z.object({
		title: z.string(),
		description: z.string().optional(),
    thumbnail: image().optional(),
    video: z.string().optional()
	}),
});

const music = defineCollection({
  loader: glob({ base: './src/content/music', pattern: '**/*.{md,mdx}' }),
  // Change schema to an arrow function! Astro will pass { image } into it.
  schema: ({ image }) => z.object({
    title: z.string(),
    id: z.string(),
    thumbnail: image(), // Now this works perfectly!
    url: z.string(),
    source: z.string(),
    tracks: z.array(z.object({
      title: z.string(),
      id: z.string().nullable(), 
      length: z.string(),
      url: z.string()
    }))
  }),
});

const art = defineCollection({
  loader: glob({ base: './src/content/art', pattern: '**/*.{md,mdx}' }),
  // Change schema to an arrow function! Astro will pass { image } into it.
  schema: ({ image }) => z.object({
    title: z.string(),
    thumbnail: image(), // Now this works perfectly!
    width: z.number(),
    height: z.number(),
    ratio: z.string()
  }),
});

export const collections = { projects, music, art };