import * as z from 'zod';
export const StaffingEngagementGroupByResultSchema = z.array(z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string(),
  client: z.string(),
  priority: z.string(),
  status: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  budget: z.number(),
  forecast: z.number(),
  notes: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  _count: z.object({
    id: z.number(),
    userId: z.number(),
    user: z.number(),
    name: z.number(),
    client: z.number(),
    priority: z.number(),
    status: z.number(),
    startDate: z.number(),
    endDate: z.number(),
    budget: z.number(),
    forecast: z.number(),
    notes: z.number(),
    createdAt: z.number(),
    updatedAt: z.number(),
    roles: z.number(),
    candidates: z.number(),
    placements: z.number()
  }).optional(),
  _sum: z.object({
    budget: z.number().nullable(),
    forecast: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    budget: z.number().nullable(),
    forecast: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    name: z.string().nullable(),
    client: z.string().nullable(),
    priority: z.string().nullable(),
    status: z.string().nullable(),
    startDate: z.date().nullable(),
    endDate: z.date().nullable(),
    budget: z.number().nullable(),
    forecast: z.number().nullable(),
    notes: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    name: z.string().nullable(),
    client: z.string().nullable(),
    priority: z.string().nullable(),
    status: z.string().nullable(),
    startDate: z.date().nullable(),
    endDate: z.date().nullable(),
    budget: z.number().nullable(),
    forecast: z.number().nullable(),
    notes: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()
}));