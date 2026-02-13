import * as z from 'zod';
// prettier-ignore
export const EntityResultSchema = z.object({
    id: z.string(),
    actorId: z.string(),
    actor: z.unknown(),
    kind: z.string(),
    direction: z.string().nullable(),
    name: z.string().nullable(),
    targetType: z.string().nullable(),
    targetId: z.string().nullable(),
    source: z.string().nullable(),
    metadata: z.unknown().nullable(),
    isGlobal: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date(),
    caches: z.array(z.unknown())
}).strict();

export type EntityResultType = z.infer<typeof EntityResultSchema>;
