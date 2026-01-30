import * as z from 'zod';
// prettier-ignore
export const EntityCacheInputSchema = z.object({
    id: z.string(),
    entityId: z.string(),
    entity: z.unknown(),
    key: z.string(),
    payload: z.unknown().optional().nullable(),
    expiresAt: z.date().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type EntityCacheInputType = z.infer<typeof EntityCacheInputSchema>;
