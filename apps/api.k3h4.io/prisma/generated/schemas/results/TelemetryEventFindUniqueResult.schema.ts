import * as z from 'zod';
export const TelemetryEventFindUniqueResultSchema = z.nullable(z.object({
  id: z.string(),
  userId: z.string().optional(),
  user: z.unknown().optional(),
  sessionId: z.string(),
  eventType: z.string(),
  source: z.string(),
  path: z.string().optional(),
  payload: z.unknown().optional(),
  durationMs: z.number().int().optional(),
  createdAt: z.date()
}));