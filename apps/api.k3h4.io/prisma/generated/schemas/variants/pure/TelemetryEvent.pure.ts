import * as z from 'zod';
// prettier-ignore
export const TelemetryEventModelSchema = z.object({
    id: z.string(),
    userId: z.string().nullable(),
    user: z.unknown().nullable(),
    sessionId: z.string(),
    eventType: z.string(),
    source: z.string(),
    path: z.string().nullable(),
    payload: z.unknown().nullable(),
    createdAt: z.date()
}).strict();

export type TelemetryEventPureType = z.infer<typeof TelemetryEventModelSchema>;
