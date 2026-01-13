import * as z from 'zod';
export const UsdaRegionFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  dataset: z.string(),
  code: z.string(),
  name: z.string().optional(),
  extra: z.unknown().optional(),
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