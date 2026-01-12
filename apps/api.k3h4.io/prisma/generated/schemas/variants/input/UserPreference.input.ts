import * as z from 'zod';
// prettier-ignore
export const UserPreferenceInputSchema = z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    theme: z.string(),
    locale: z.string(),
    timezone: z.string(),
    marketingOptIn: z.boolean(),
    note: z.string().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type UserPreferenceInputType = z.infer<typeof UserPreferenceInputSchema>;
