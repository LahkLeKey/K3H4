import * as z from 'zod';
// prettier-ignore
export const PosStoreModelSchema = z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    name: z.string(),
    channel: z.string(),
    tickets: z.array(z.unknown()),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type PosStorePureType = z.infer<typeof PosStoreModelSchema>;
