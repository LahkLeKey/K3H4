import * as z from 'zod';
// prettier-ignore
export const UserInputSchema = z.object({
    id: z.string(),
    email: z.string(),
    provider: z.string(),
    providerId: z.string(),
    k3h4CoinBalance: z.number(),
    displayName: z.string().optional().nullable(),
    avatarUrl: z.string().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    refreshTokens: z.array(z.unknown()),
    telemetry: z.array(z.unknown()),
    providerGrants: z.array(z.unknown()),
    chatSessions: z.array(z.unknown()),
    ollamaOperations: z.array(z.unknown()),
    actors: z.array(z.unknown())
}).strict();

export type UserInputType = z.infer<typeof UserInputSchema>;
