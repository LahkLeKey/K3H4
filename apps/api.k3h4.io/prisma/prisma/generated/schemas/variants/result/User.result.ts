import * as z from 'zod';
// prettier-ignore
export const UserResultSchema = z.object({
    id: z.string(),
    email: z.string(),
    provider: z.string(),
    providerId: z.string(),
    k3h4CoinBalance: z.number(),
    displayName: z.string().nullable(),
    avatarUrl: z.string().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    refreshTokens: z.array(z.unknown()),
    preference: z.unknown().nullable(),
    telemetry: z.array(z.unknown()),
    providerGrants: z.array(z.unknown()),
    chatSessions: z.array(z.unknown()),
    aiInsights: z.array(z.unknown()),
    ollamaOperations: z.array(z.unknown()),
    actors: z.array(z.unknown()),
    freightLoads: z.array(z.unknown())
}).strict();

export type UserResultType = z.infer<typeof UserResultSchema>;
