import * as z from 'zod';
export const AgricultureResourceFindFirstResultSchema = z.nullable(z.object({
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
}));