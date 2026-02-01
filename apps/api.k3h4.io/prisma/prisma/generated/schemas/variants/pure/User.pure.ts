import * as z from 'zod';
// prettier-ignore
export const UserModelSchema = z.object({
    id: z.string(),
    email: z.string(),
    provider: z.string(),
    providerId: z.string(),
    k3h4CoinBalance: z.number(),
    displayName: z.string().nullable(),
    avatarUrl: z.string().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    telemetry: z.array(z.unknown()),
    actors: z.array(z.unknown())
}).strict();

export type UserPureType = z.infer<typeof UserModelSchema>;
