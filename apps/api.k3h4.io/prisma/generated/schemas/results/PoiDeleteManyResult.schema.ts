import * as z from 'zod';
export const PoiDeleteManyResultSchema = z.object({
  count: z.number()
});