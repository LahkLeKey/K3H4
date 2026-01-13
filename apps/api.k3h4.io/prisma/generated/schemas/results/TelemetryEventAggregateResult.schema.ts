import * as z from 'zod';
export const TelemetryEventAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    userId: z.number(),
    user: z.number(),
    sessionId: z.number(),
    eventType: z.number(),
    source: z.number(),
    path: z.number(),
    payload: z.number(),
    createdAt: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    sessionId: z.string().nullable(),
    eventType: z.string().nullable(),
    source: z.string().nullable(),
    path: z.string().nullable(),
    createdAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    sessionId: z.string().nullable(),
    eventType: z.string().nullable(),
    source: z.string().nullable(),
    path: z.string().nullable(),
    createdAt: z.date().nullable()
  }).nullable().optional()});