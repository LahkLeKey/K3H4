import * as z from 'zod';
// prettier-ignore
export const TelemetryEventResultSchema = z.object({
    id: z.string(),
    userId: z.string().nullable(),
    user: z.unknown().nullable(),
    sessionId: z.string(),
    eventType: z.string(),
    source: z.string(),
    path: z.string().nullable(),
    payload: z.unknown().nullable(),
    durationMs: z.number().int().nullable(),
    createdAt: z.date()
}).strict();

export type TelemetryEventResultType = z.infer<typeof TelemetryEventResultSchema>;
