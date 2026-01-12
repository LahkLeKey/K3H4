import * as z from 'zod';
export const WarehouseItemCreateResultSchema = z.object({
  id: z.string(),
  userId: z.string(),
  user: z.unknown(),
  sku: z.string(),
  description: z.string().optional(),
  quantity: z.number().int(),
  location: z.string(),
  status: z.string(),
  freightLoadId: z.string().optional(),
  freightLoad: z.unknown().optional(),
  createdAt: z.date(),
  updatedAt: z.date()
});