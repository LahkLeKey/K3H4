import * as z from 'zod';

export const TelemetryEventScalarFieldEnumSchema = z.enum(['id', 'userId', 'sessionId', 'eventType', 'source', 'path', 'payload', 'durationMs', 'error', 'createdAt'])

export type TelemetryEventScalarFieldEnum = z.infer<typeof TelemetryEventScalarFieldEnumSchema>;