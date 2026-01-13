import * as z from 'zod';
export const UsdaCountryFindFirstResultSchema = z.nullable(z.object({
  id: z.string(),
  dataset: z.string(),
  code: z.string(),
  name: z.string().optional(),
  regionCode: z.string().optional(),
  extra: z.unknown().optional(),
  createdAt: z.date(),
  updatedAt: z.date()
}));