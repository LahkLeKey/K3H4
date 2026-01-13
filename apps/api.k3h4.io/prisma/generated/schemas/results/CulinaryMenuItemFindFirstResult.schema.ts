import * as z from 'zod';
export const CulinaryMenuItemFindFirstResultSchema = z.nullable(z.object({
  id: z.string(),
  userId: z.string(),
  user: z.unknown(),
  name: z.string(),
  prepMinutes: z.number().int(),
  cost: z.number(),
  price: z.number(),
  createdAt: z.date(),
  updatedAt: z.date()
}));