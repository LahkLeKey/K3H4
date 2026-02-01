import * as z from 'zod';
export const UserFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  email: z.string(),
  provider: z.string(),
  providerId: z.string(),
  k3h4CoinBalance: z.number(),
  displayName: z.string().optional(),
  avatarUrl: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  refreshTokens: z.array(z.unknown()),
  preference: z.unknown().optional(),
  telemetry: z.array(z.unknown()),
  providerGrants: z.array(z.unknown()),
  chatSessions: z.array(z.unknown()),
  ollamaOperations: z.array(z.unknown()),
  actors: z.array(z.unknown())
})),
  pagination: z.object({
  page: z.number().int().min(1),
  pageSize: z.number().int().min(1),
  total: z.number().int().min(0),
  totalPages: z.number().int().min(0),
  hasNext: z.boolean(),
  hasPrev: z.boolean()
})
});