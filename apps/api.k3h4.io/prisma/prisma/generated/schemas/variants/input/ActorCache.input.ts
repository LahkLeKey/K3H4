import * as z from 'zod';
// prettier-ignore
export const ActorCacheInputSchema = z.object({
    id: z.string(),
    actorId: z.string(),
    actor: z.unknown(),
    key: z.string(),
    payload: z.unknown().optional().nullable(),
    expiresAt: z.date().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type ActorCacheInputType = z.infer<typeof ActorCacheInputSchema>;
