import * as z from 'zod';
// prettier-ignore
export const PosLineItemResultSchema = z.object({
    id: z.string(),
    ticketId: z.string(),
    ticket: z.unknown(),
    name: z.string(),
    quantity: z.number().int(),
    price: z.number(),
    createdAt: z.date()
}).strict();

export type PosLineItemResultType = z.infer<typeof PosLineItemResultSchema>;
