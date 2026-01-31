import * as z from 'zod';
// prettier-ignore
export const MaptilerQueryModelSchema = z.object({
    id: z.string(),
    userId: z.string().nullable(),
    user: z.unknown().nullable(),
    actorId: z.string().nullable(),
    actor: z.unknown().nullable(),
    signature: z.string(),
    kind: z.string(),
    path: z.string(),
    params: z.unknown().nullable(),
    lastUsedAt: z.date(),
    createdAt: z.date(),
    updatedAt: z.date(),
    cacheEntries: z.array(z.unknown())
}).strict();

export type MaptilerQueryPureType = z.infer<typeof MaptilerQueryModelSchema>;
