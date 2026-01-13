import * as z from 'zod';
export const UsdaReleaseFindUniqueResultSchema = z.nullable(z.object({
  id: z.string(),
  dataset: z.string(),
  scope: z.string(),
  releasedOn: z.date(),
  note: z.string().optional(),
  fetchedAt: z.date(),
  createdAt: z.date(),
  updatedAt: z.date()
}));