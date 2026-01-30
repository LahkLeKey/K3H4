import * as z from 'zod';
export const EntityCreateManyResultSchema = z.object({
  count: z.number()
});