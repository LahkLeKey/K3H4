import * as z from 'zod';
export const EntityUpdateManyResultSchema = z.object({
  count: z.number()
});