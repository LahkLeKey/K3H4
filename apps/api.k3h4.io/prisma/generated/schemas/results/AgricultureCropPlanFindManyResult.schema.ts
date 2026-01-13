import * as z from 'zod';
export const AgricultureCropPlanFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  userId: z.string(),
  plotId: z.string(),
  user: z.unknown(),
  plot: z.unknown(),
  crop: z.string(),
  phase: z.string(),
  status: z.string(),
  startDate: z.date(),
  targetHarvestDate: z.date().optional(),
  endDate: z.date().optional(),
  notes: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  tasks: z.array(z.unknown())
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