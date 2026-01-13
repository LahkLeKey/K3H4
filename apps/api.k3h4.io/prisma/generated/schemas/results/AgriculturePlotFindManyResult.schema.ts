import * as z from 'zod';
export const AgriculturePlotFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  userId: z.string(),
  user: z.unknown(),
  name: z.string(),
  fieldCode: z.string().optional(),
  crop: z.string(),
  stage: z.string(),
  acres: z.number(),
  health: z.string(),
  soilType: z.string().optional(),
  irrigationZone: z.string().optional(),
  notes: z.string().optional(),
  lastConditionAt: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  cropPlans: z.array(z.unknown()),
  conditions: z.array(z.unknown()),
  tasks: z.array(z.unknown()),
  slots: z.array(z.unknown())
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