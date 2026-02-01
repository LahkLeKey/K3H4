import * as z from 'zod';
export const ActorDeleteManyResultSchema = z.object({
  count: z.number()
});