import * as z from 'zod';
export const PosStoreDeleteResultSchema = z.nullable(z.object({
  id: z.string(),
  userId: z.string(),
  user: z.unknown(),
  name: z.string(),
  channel: z.string(),
  tickets: z.array(z.unknown()),
  createdAt: z.date(),
  updatedAt: z.date()
}));