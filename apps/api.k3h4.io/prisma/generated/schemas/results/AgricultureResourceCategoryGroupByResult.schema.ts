import * as z from 'zod';
export const AgricultureResourceCategoryGroupByResultSchema = z.array(z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  _count: z.object({
    id: z.number(),
    slug: z.number(),
    title: z.number(),
    description: z.number(),
    createdAt: z.number(),
    updatedAt: z.number(),
    resources: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    slug: z.string().nullable(),
    title: z.string().nullable(),
    description: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    slug: z.string().nullable(),
    title: z.string().nullable(),
    description: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()
}));