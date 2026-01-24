import * as z from 'zod';
export const UsdaUnitFindFirstResultSchema = z.nullable(z.object({
  id: z.string(),
  dataset: z.string(),
  code: z.string(),
  name: z.string().optional(),
  wikidataId: z.string().optional(),
  enrichment: z.unknown().optional(),
  extra: z.unknown().optional(),
  createdAt: z.date(),
  updatedAt: z.date()
}));