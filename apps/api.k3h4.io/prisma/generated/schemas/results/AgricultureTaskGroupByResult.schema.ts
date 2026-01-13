import * as z from 'zod';
export const AgricultureTaskGroupByResultSchema = z.array(z.object({
  id: z.string(),
  userId: z.string(),
  plotId: z.string(),
  cropPlanId: z.string(),
  title: z.string(),
  assignee: z.string(),
  priority: z.number().int(),
  tags: z.unknown(),
  notes: z.string(),
  dueDate: z.date(),
  status: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  _count: z.object({
    id: z.number(),
    userId: z.number(),
    user: z.number(),
    plotId: z.number(),
    plot: z.number(),
    cropPlanId: z.number(),
    cropPlan: z.number(),
    title: z.number(),
    assignee: z.number(),
    priority: z.number(),
    tags: z.number(),
    notes: z.number(),
    dueDate: z.number(),
    status: z.number(),
    createdAt: z.number(),
    updatedAt: z.number()
  }).optional(),
  _sum: z.object({
    priority: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    priority: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    plotId: z.string().nullable(),
    cropPlanId: z.string().nullable(),
    title: z.string().nullable(),
    assignee: z.string().nullable(),
    priority: z.number().int().nullable(),
    notes: z.string().nullable(),
    dueDate: z.date().nullable(),
    status: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    plotId: z.string().nullable(),
    cropPlanId: z.string().nullable(),
    title: z.string().nullable(),
    assignee: z.string().nullable(),
    priority: z.number().int().nullable(),
    notes: z.string().nullable(),
    dueDate: z.date().nullable(),
    status: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()
}));