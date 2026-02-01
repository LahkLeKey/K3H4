import * as z from 'zod';
export const EntityDeleteManyResultSchema = z.object({
  count: z.number()
});