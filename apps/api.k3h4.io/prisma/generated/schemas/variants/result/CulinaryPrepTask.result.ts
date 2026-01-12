import * as z from 'zod';
// prettier-ignore
export const CulinaryPrepTaskResultSchema = z.object({
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

export type CulinaryPrepTaskResultType = z.infer<typeof CulinaryPrepTaskResultSchema>;
