import * as z from 'zod';
export const UsdaSyncStateFindFirstResultSchema = z.nullable(z.object({
  id: z.string(),
  dataset: z.string(),
  scope: z.string(),
  lastReleaseOn: z.date().optional(),
  lastSyncedAt: z.date().optional(),
  note: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date()
}));