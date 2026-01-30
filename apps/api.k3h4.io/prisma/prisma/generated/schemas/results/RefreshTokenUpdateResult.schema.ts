import * as z from 'zod';
export const RefreshTokenUpdateResultSchema = z.nullable(z.object({
  id: z.string(),
  token: z.string(),
  userId: z.string(),
  user: z.unknown(),
  createdAt: z.date(),
  expiresAt: z.date()
}));