import * as z from 'zod';
export const PosLineItemFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  ticketId: z.string(),
  ticket: z.unknown(),
  name: z.string(),
  quantity: z.number().int(),
  price: z.number(),
  createdAt: z.date()
})),
  pagination: z.object({
  page: z.number().int().min(1),
  pageSize: z.number().int().min(1),
  total: z.number().int().min(0),
  totalPages: z.number().int().min(0),
  hasNext: z.boolean(),
  hasPrev: z.boolean()
})
});