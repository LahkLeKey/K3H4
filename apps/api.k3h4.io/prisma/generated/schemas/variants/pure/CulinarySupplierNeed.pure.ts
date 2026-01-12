import * as z from 'zod';
// prettier-ignore
export const CulinarySupplierNeedModelSchema = z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    item: z.string(),
    quantity: z.string(),
    status: z.string(),
    dueDate: z.date().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type CulinarySupplierNeedPureType = z.infer<typeof CulinarySupplierNeedModelSchema>;
