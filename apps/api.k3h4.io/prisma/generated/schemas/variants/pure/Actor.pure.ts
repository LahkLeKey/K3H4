import * as z from 'zod';
// prettier-ignore
export const ActorModelSchema = z.object({
    id: z.string(),
    userId: z.string().nullable(),
    user: z.unknown().nullable(),
    label: z.string(),
    type: z.string(),
    note: z.string().nullable(),
    source: z.string().nullable(),
    metadata: z.unknown().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    entities: z.array(z.unknown())
}).strict();

export type ActorPureType = z.infer<typeof ActorModelSchema>;
