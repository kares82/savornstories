import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const localized = z.object({ en: z.string(), fr: z.string(), es: z.string() });
const localizedList = z.object({
  en: z.array(z.string()),
  fr: z.array(z.string()),
  es: z.array(z.string()),
});
const localizedParagraphs = z.object({
  en: z.array(z.string()),
  fr: z.array(z.string()),
  es: z.array(z.string()),
});

const tours = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/tours' }),
  schema: z.object({
    city: z.enum(['bordeaux', 'dieppe']),
    title: localized,
    summary: localized,
    duration: localized,
    price: z.string().nullable(),
    priceLabel: localized.optional(),
    schedule: localized.optional(),
    meetingPoint: localized.optional(),
    included: localizedList.default({ en: [], fr: [], es: [] }),
    goodToKnow: localized.optional(),
    description: localizedParagraphs,
    icon: z.string(),
    order: z.number().default(0),
    heroImage: z.string().optional(),
    gallery: z.array(z.object({ src: z.string(), alt: z.string() })).default([]),
  }),
});

export const collections = { tours };
