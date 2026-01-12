import * as z from 'zod';
export const AgricultureInventoryFindFirstResultSchema = z.nullable(z.object({
  id: z.string(),
  userId: z.string(),
  user: z.unknown(),
  sku: z.string(),
  description: z.string().optional(),
  totalQuantity: z.number(),
  unit: z.string(),
  location: z.string().optional(),
  status: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  movements: z.array(z.unknown())
}));