import * as z from 'zod';
export const AgricultureResourceFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  categoryId: z.string(),
  category: z.unknown(),
  title: z.string(),
  summary: z.string(),
  url: z.string(),
  tags: z.array(z.string()),
  source: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date()
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