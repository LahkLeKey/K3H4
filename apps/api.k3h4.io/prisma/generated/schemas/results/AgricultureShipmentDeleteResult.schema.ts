import * as z from 'zod';
export const AgricultureShipmentDeleteResultSchema = z.nullable(z.object({
  id: z.string(),
  userId: z.string(),
  user: z.unknown(),
  lot: z.string(),
  destination: z.string(),
  mode: z.string(),
  eta: z.date().optional(),
  freightLoadId: z.string().optional(),
  freightLoad: z.unknown().optional(),
  inventoryMovements: z.array(z.unknown()),
  createdAt: z.date(),
  updatedAt: z.date()
}));