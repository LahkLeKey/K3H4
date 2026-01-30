import * as z from 'zod';
// prettier-ignore
export const TelemetryEventInputSchema = z.object({
    id: z.string(),
    userId: z.string().optional().nullable(),
    user: z.unknown().optional().nullable(),
    sessionId: z.string(),
    eventType: z.string(),
    source: z.string(),
    path: z.string().optional().nullable(),
    payload: z.unknown().optional().nullable(),
    durationMs: z.number().int().optional().nullable(),
    error: z.boolean(),
    createdAt: z.date()
}).strict();

export type TelemetryEventInputType = z.infer<typeof TelemetryEventInputSchema>;
