import * as z from 'zod';
export const AiInsightAggregateResultSchema = z.object({  _count: z.object({
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
  }).nullable().optional()});