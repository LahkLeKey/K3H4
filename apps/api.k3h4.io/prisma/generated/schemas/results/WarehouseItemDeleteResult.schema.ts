import * as z from 'zod';
export const WarehouseItemDeleteResultSchema = z.nullable(z.object({
  id: z.string(),
  userId: z.string(),
  user: z.unknown(),
  sku: z.string(),
  description: z.string().optional(),
  quantity: z.number().int(),
  location: z.string(),
  status: z.unknown(),
  freightLoadId: z.string().optional(),
  freightLoad: z.unknown().optional(),
  category: z.unknown(),
  metadata: z.unknown().optional(),
  createdAt: z.date(),
  updatedAt: z.date()
}));