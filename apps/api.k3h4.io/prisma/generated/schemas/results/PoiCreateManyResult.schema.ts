import * as z from 'zod';
export const PoiCreateManyResultSchema = z.object({
  count: z.number()
});