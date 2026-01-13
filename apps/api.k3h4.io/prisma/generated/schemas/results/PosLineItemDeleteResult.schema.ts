import * as z from 'zod';
export const PosLineItemDeleteResultSchema = z.nullable(z.object({
  id: z.string(),
  ticketId: z.string(),
  ticket: z.unknown(),
  name: z.string(),
  quantity: z.number().int(),
  price: z.number(),
  createdAt: z.date()
}));