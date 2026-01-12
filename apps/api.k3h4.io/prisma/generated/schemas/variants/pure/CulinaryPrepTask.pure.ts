import * as z from 'zod';
// prettier-ignore
export const CulinaryPrepTaskModelSchema = z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    task: z.string(),
    station: z.string(),
    dueAt: z.date().nullable(),
    status: z.string(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type CulinaryPrepTaskPureType = z.infer<typeof CulinaryPrepTaskModelSchema>;
