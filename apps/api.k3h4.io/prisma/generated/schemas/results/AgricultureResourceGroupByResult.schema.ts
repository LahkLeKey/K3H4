import * as z from 'zod';
export const AgricultureResourceGroupByResultSchema = z.array(z.object({
  id: z.string(),
  categoryId: z.string(),
  title: z.string(),
  summary: z.string(),
  url: z.string(),
  tags: z.array(z.string()),
  source: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  _count: z.object({
    id: z.number(),
    categoryId: z.number(),
    category: z.number(),
    title: z.number(),
    summary: z.number(),
    url: z.number(),
    tags: z.number(),
    source: z.number(),
    createdAt: z.number(),
    updatedAt: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    categoryId: z.string().nullable(),
    title: z.string().nullable(),
    summary: z.string().nullable(),
    url: z.string().nullable(),
    tags: z.array(z.string()).nullable(),
    source: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    categoryId: z.string().nullable(),
    title: z.string().nullable(),
    summary: z.string().nullable(),
    url: z.string().nullable(),
    tags: z.array(z.string()).nullable(),
    source: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()
}));