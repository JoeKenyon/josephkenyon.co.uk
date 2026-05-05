import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
	loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
    image: z.string().optional(),
    videoUrl: z.string().optional()
	}),
});

const music = defineCollection({
  loader: glob({ base: './src/content/music', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    id: z.string(),
    imageUrl: z.string(),
    url: z.string(),
    source: z.string(),
    tracks: z.array(z.object({
      title: z.string(),
      id: z.string().nullable(), // Use .nullable() in case a track ID is missing
      length: z.string(),
      url: z.string()
    }))
  }),
});

const art = defineCollection({
	loader: glob({ base: './src/content/art', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
    imageName: z.string(),
    width: z.number(),
    height: z.number(),
    ratio: z.string()
	}),
});

export const collections = { projects, music, art };
