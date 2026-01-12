import * as z from 'zod';
// prettier-ignore
export const PersonaResultSchema = z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    alias: z.string(),
    account: z.string(),
    handle: z.string().nullable(),
    note: z.string().nullable(),
    tags: z.unknown().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    assignments: z.array(z.unknown()),
    assignmentPayouts: z.array(z.unknown()),
    attributes: z.array(z.unknown()),
    compatibilitySources: z.array(z.unknown()),
    compatibilityTargets: z.array(z.unknown())
}).strict();

export type PersonaResultType = z.infer<typeof PersonaResultSchema>;
