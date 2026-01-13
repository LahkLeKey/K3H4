import * as z from 'zod';
export const ProviderGrantFindFirstResultSchema = z.nullable(z.object({
  id: z.string(),
  userId: z.string(),
  user: z.unknown(),
  provider: z.string(),
  providerId: z.string(),
  accessToken: z.string(),
  scope: z.string().optional(),
  expiresAt: z.date().optional(),
  createdAt: z.date()
}));