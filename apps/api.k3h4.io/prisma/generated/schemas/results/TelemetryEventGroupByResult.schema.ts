import * as z from 'zod';
export const TelemetryEventGroupByResultSchema = z.array(z.object({
  id: z.string(),
  userId: z.string(),
  sessionId: z.string(),
  eventType: z.string(),
  source: z.string(),
  path: z.string(),
  payload: z.unknown(),
  durationMs: z.number().int(),
  error: z.boolean(),
  createdAt: z.date(),
  _count: z.object({
    id: z.number(),
    userId: z.number(),
    user: z.number(),
    sessionId: z.number(),
    eventType: z.number(),
    source: z.number(),
    path: z.number(),
    payload: z.number(),
    durationMs: z.number(),
    error: z.number(),
    createdAt: z.number()
  }).optional(),
  _sum: z.object({
    durationMs: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    durationMs: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    sessionId: z.string().nullable(),
    eventType: z.string().nullable(),
    source: z.string().nullable(),
    path: z.string().nullable(),
    durationMs: z.number().int().nullable(),
    createdAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    sessionId: z.string().nullable(),
    eventType: z.string().nullable(),
    source: z.string().nullable(),
    path: z.string().nullable(),
    durationMs: z.number().int().nullable(),
    createdAt: z.date().nullable()
  }).nullable().optional()
}));