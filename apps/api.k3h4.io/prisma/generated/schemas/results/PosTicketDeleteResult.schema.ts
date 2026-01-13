import * as z from 'zod';
export const PosTicketDeleteResultSchema = z.nullable(z.object({
  id: z.string(),
  userId: z.string(),
  user: z.unknown(),
  storeId: z.string(),
  store: z.unknown(),
  total: z.number(),
  itemsCount: z.number().int(),
  channel: z.string(),
  status: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  lineItems: z.array(z.unknown())
}));