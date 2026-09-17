import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { rssSchema } from '@astrojs/rss';

/**
 * Consultora Norte — blog content collection.
 *
 * Schema is intentionally strict: every post MUST have the SEO/OG frontmatter
 * the editorial team needs to publish without touching the templates.
 */
const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: rssSchema.extend({
    title: z.string().min(8).max(110),
    description: z.string().min(40).max(200),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().min(2),
    authorRole: z.string().min(2),
    category: z.enum(['Estrategia', 'Operaciones', 'Finanzas', 'RR.HH.', 'Casos']),
    readingTime: z.number().int().positive(),
    heroImage: z.string().min(2).optional(),
    heroAlt: z.string().min(8),
    ogImage: z.string().min(2).optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
  }),
});

export const collections = { blog };

