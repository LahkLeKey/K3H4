import * as z from 'zod';
export const ArcadePrizeFindFirstResultSchema = z.nullable(z.object({
  id: z.string(),
  userId: z.string(),
  user: z.unknown(),
  name: z.string(),
  sku: z.string().optional(),
  costCoins: z.number(),
  stock: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  redemptions: z.array(z.unknown())
}));