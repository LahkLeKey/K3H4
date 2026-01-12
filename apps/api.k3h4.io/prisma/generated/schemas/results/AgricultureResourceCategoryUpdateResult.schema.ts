import * as z from 'zod';
export const AgricultureResourceCategoryUpdateResultSchema = z.nullable(z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  description: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  resources: z.array(z.unknown())
}));