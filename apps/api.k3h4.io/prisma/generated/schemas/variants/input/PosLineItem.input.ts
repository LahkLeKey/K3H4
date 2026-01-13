import * as z from 'zod';
// prettier-ignore
export const PosLineItemInputSchema = z.object({
    id: z.string(),
    ticketId: z.string(),
    ticket: z.unknown(),
    name: z.string(),
    quantity: z.number().int(),
    price: z.number(),
    createdAt: z.date()
}).strict();

export type PosLineItemInputType = z.infer<typeof PosLineItemInputSchema>;
