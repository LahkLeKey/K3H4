import * as z from 'zod';
// prettier-ignore
export const ActorInputSchema = z.object({
    id: z.string(),
    userId: z.string().optional().nullable(),
    user: z.unknown().optional().nullable(),
    label: z.string(),
    type: z.string(),
    note: z.string().optional().nullable(),
    source: z.string().optional().nullable(),
    metadata: z.unknown().optional().nullable(),
    category: z.string().optional().nullable(),
    lastSeenAt: z.date().optional().nullable(),
    isGlobal: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date(),
    entities: z.array(z.unknown()),
    caches: z.array(z.unknown())
}).strict();

export type ActorInputType = z.infer<typeof ActorInputSchema>;
