import * as z from 'zod';
export const PersonaCreateManyResultSchema = z.object({
  count: z.number()
});