import * as z from 'zod';
export const UsdaCountryGroupByResultSchema = z.array(z.object({
  id: z.string(),
  dataset: z.string(),
  code: z.string(),
  name: z.string(),
  regionCode: z.string(),
  extra: z.unknown(),
  createdAt: z.date(),
  updatedAt: z.date(),
  _count: z.object({
    id: z.number(),
    dataset: z.number(),
    code: z.number(),
    name: z.number(),
    regionCode: z.number(),
    extra: z.number(),
    createdAt: z.number(),
    updatedAt: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    dataset: z.string().nullable(),
    code: z.string().nullable(),
    name: z.string().nullable(),
    regionCode: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    dataset: z.string().nullable(),
    code: z.string().nullable(),
    name: z.string().nullable(),
    regionCode: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()
}));