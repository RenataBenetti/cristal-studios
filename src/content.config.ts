import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    excerpt: z.string(),
    coverImage: z.string().optional(),
    coverAlt: z.string().optional(),
    category: z.enum(['podcast-conteudo']),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    author: z.string().default('Cristal Studios'),
    readingTime: z.number().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    seo: z
      .object({
        title: z.string().optional(),
        description: z.string().optional(),
      })
      .optional(),
  }),
});

export const collections = { blog };
