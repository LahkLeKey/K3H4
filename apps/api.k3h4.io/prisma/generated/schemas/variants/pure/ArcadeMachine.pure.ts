import * as z from 'zod';
// prettier-ignore
export const ArcadeMachineModelSchema = z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    name: z.string(),
    gameTitle: z.string(),
    status: z.string(),
    location: z.string().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    sessions: z.array(z.unknown())
}).strict();

export type ArcadeMachinePureType = z.infer<typeof ArcadeMachineModelSchema>;
