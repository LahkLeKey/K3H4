import * as z from 'zod';
// prettier-ignore
export const PersonaInputSchema = z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    alias: z.string(),
    account: z.string(),
    handle: z.string().optional().nullable(),
    note: z.string().optional().nullable(),
    tags: z.unknown().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    assignments: z.array(z.unknown()),
    assignmentPayouts: z.array(z.unknown()),
    staffingCandidates: z.array(z.unknown()),
    staffingShiftsAssigned: z.array(z.unknown()),
    staffingPlacements: z.array(z.unknown()),
    attributes: z.array(z.unknown()),
    compatibilitySources: z.array(z.unknown()),
    compatibilityTargets: z.array(z.unknown())
}).strict();

export type PersonaInputType = z.infer<typeof PersonaInputSchema>;
