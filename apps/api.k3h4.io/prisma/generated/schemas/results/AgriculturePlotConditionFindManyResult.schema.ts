import * as z from 'zod';
export const AgriculturePlotConditionFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  userId: z.string(),
  plotId: z.string(),
  user: z.unknown(),
  plot: z.unknown(),
  recordedAt: z.date(),
  temperature: z.number().optional(),
  moisture: z.number().optional(),
  ph: z.number().optional(),
  notes: z.string().optional(),
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