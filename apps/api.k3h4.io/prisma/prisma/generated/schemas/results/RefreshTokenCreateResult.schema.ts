import * as z from 'zod';
export const RefreshTokenCreateResultSchema = z.object({
  id: z.string(),
  token: z.string(),
  userId: z.string(),
  user: z.unknown(),
  createdAt: z.date(),
  expiresAt: z.date()
});