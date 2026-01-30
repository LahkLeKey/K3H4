import * as z from 'zod';
// prettier-ignore
export const ActorCacheModelSchema = z.object({
    id: z.string(),
    actorId: z.string(),
    actor: z.unknown(),
    key: z.string(),
    payload: z.unknown().nullable(),
    expiresAt: z.date().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type ActorCachePureType = z.infer<typeof ActorCacheModelSchema>;
