import * as z from 'zod';
export const AgricultureResourceCategoryFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  description: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  resources: z.array(z.unknown())
})),
  pagination: z.object({
  page: z.number().int().min(1),
  pageSize: z.number().int().min(1),
  total: z.number().int().min(0),
  totalPages: z.number().int().min(0),
  hasNext: z.boolean(),
  hasPrev: z.boolean()
})
});