import * as z from 'zod';
// prettier-ignore
export const AgricultureInventoryResultSchema = z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    sku: z.string(),
    description: z.string().nullable(),
    totalQuantity: z.number(),
    unit: z.string(),
    location: z.string().nullable(),
    status: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    movements: z.array(z.unknown())
}).strict();

export type AgricultureInventoryResultType = z.infer<typeof AgricultureInventoryResultSchema>;
