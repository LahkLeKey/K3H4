import * as z from 'zod';
export const UserPreferenceUpdateResultSchema = z.nullable(z.object({
  id: z.string(),
  userId: z.string(),
  user: z.unknown(),
  theme: z.string(),
  locale: z.string(),
  timezone: z.string(),
  marketingOptIn: z.boolean(),
  note: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date()
}));