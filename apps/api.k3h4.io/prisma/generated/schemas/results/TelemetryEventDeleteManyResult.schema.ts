import * as z from 'zod';
export const TelemetryEventDeleteManyResultSchema = z.object({
  count: z.number()
});