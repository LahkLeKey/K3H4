import * as z from 'zod';
// prettier-ignore
export const EntityInputSchema = z.object({
    id: z.string(),
    actorId: z.string(),
    actor: z.unknown(),
    kind: z.string(),
    name: z.string().optional().nullable(),
    targetType: z.string().optional().nullable(),
    targetId: z.string().optional().nullable(),
    source: z.string().optional().nullable(),
    metadata: z.unknown().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type EntityInputType = z.infer<typeof EntityInputSchema>;
