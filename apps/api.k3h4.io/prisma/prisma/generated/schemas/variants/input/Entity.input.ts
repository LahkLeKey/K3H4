import * as z from 'zod';
// prettier-ignore
export const EntityInputSchema = z.object({
    id: z.string(),
    actorId: z.string(),
    actor: z.unknown(),
    kind: z.string(),
    direction: z.string().optional().nullable(),
    name: z.string().optional().nullable(),
    targetType: z.string().optional().nullable(),
    targetId: z.string().optional().nullable(),
    source: z.string().optional().nullable(),
    metadata: z.unknown().optional().nullable(),
    isGlobal: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date(),
    caches: z.array(z.unknown())
}).strict();

export type EntityInputType = z.infer<typeof EntityInputSchema>;
