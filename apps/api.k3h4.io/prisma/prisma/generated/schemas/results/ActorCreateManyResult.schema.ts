import * as z from 'zod';
export const ActorCreateManyResultSchema = z.object({
  count: z.number()
});