import * as z from 'zod';
export const UserFindFirstResultSchema = z.nullable(z.object({
  id: z.string(),
  email: z.string(),
  provider: z.string(),
  providerId: z.string(),
  k3h4CoinBalance: z.number(),
  displayName: z.string().optional(),
  avatarUrl: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  telemetry: z.array(z.unknown()),
  actors: z.array(z.unknown())
}));