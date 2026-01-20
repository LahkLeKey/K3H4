import * as z from 'zod';
export const MaptilerQueryDeleteResultSchema = z.nullable(z.object({
  id: z.string(),
  userId: z.string().optional(),
  user: z.unknown().optional(),
  signature: z.string(),
  kind: z.string(),
  path: z.string(),
  params: z.unknown().optional(),
  lastUsedAt: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
  cacheEntries: z.array(z.unknown())
}));