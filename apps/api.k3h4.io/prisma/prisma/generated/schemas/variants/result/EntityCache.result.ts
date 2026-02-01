import * as z from 'zod';
// prettier-ignore
export const EntityCacheResultSchema = z.object({
    id: z.string(),
    entityId: z.string(),
    entity: z.unknown(),
    key: z.string(),
    payload: z.unknown().nullable(),
    expiresAt: z.date().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type EntityCacheResultType = z.infer<typeof EntityCacheResultSchema>;
