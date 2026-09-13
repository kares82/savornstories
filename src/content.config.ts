import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const tours = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/tours' }),
  schema: z.object({
    city: z.enum(['bordeaux', 'dieppe']),
    title: z.string(),
    summary: z.string(),
    duration: z.string(),
    price: z.string().nullable(),
    priceLabel: z.string().optional(),
    schedule: z.string().optional(),
    meetingPoint: z.string().optional(),
    included: z.array(z.string()).default([]),
    goodToKnow: z.string().optional(),
    icon: z.string(),
    order: z.number().default(0),
  }),
});

export const collections = { tours };
