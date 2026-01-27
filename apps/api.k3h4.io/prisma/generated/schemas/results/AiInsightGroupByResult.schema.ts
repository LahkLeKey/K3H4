import * as z from 'zod';
export const AiInsightGroupByResultSchema = z.array(z.object({
  id: z.string(),
  userId: z.string(),
  targetType: z.string(),
  targetId: z.string(),
  targetLabel: z.string(),
  description: z.string(),
  metadata: z.unknown(),
  payload: z.unknown(),
  createdAt: z.date(),
  updatedAt: z.date(),
  _count: z.object({
    id: z.number(),
    userId: z.number(),
    user: z.number(),
    targetType: z.number(),
    targetId: z.number(),
    targetLabel: z.number(),
    description: z.number(),
    metadata: z.number(),
    payload: z.number(),
    createdAt: z.number(),
    updatedAt: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    targetType: z.string().nullable(),
    targetId: z.string().nullable(),
    targetLabel: z.string().nullable(),
    description: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    targetType: z.string().nullable(),
    targetId: z.string().nullable(),
    targetLabel: z.string().nullable(),
    description: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()
}));