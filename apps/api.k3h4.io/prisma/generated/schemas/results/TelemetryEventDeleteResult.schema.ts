import * as z from 'zod';
export const TelemetryEventDeleteResultSchema = z.nullable(z.object({
  id: z.string(),
  userId: z.string().optional(),
  user: z.unknown().optional(),
  sessionId: z.string(),
  eventType: z.string(),
  source: z.string(),
  path: z.string().optional(),
  payload: z.unknown().optional(),
  createdAt: z.date()
}));