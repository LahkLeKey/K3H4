import * as z from 'zod';
export const TelemetryEventCreateManyResultSchema = z.object({
  count: z.number()
});