import * as z from 'zod';
// prettier-ignore
export const UserPreferenceModelSchema = z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    theme: z.string(),
    locale: z.string(),
    timezone: z.string(),
    marketingOptIn: z.boolean(),
    note: z.string().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type UserPreferencePureType = z.infer<typeof UserPreferenceModelSchema>;
