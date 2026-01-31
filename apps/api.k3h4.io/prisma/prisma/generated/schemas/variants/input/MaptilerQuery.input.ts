import * as z from 'zod';
// prettier-ignore
export const MaptilerQueryInputSchema = z.object({
    id: z.string(),
    userId: z.string().optional().nullable(),
    user: z.unknown().optional().nullable(),
    actorId: z.string().optional().nullable(),
    actor: z.unknown().optional().nullable(),
    signature: z.string(),
    kind: z.string(),
    path: z.string(),
    params: z.unknown().optional().nullable(),
    lastUsedAt: z.date(),
    createdAt: z.date(),
    updatedAt: z.date(),
    cacheEntries: z.array(z.unknown())
}).strict();

export type MaptilerQueryInputType = z.infer<typeof MaptilerQueryInputSchema>;
