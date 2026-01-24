import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  dataset: z.literal(true).optional(),
  code: z.literal(true).optional(),
  name: z.literal(true).optional(),
  regionCode: z.literal(true).optional(),
  wikidataId: z.literal(true).optional(),
  enrichment: z.literal(true).optional(),
  extra: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const UsdaCountryCountAggregateInputObjectSchema: z.ZodType<Prisma.UsdaCountryCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.UsdaCountryCountAggregateInputType>;
export const UsdaCountryCountAggregateInputObjectZodSchema = makeSchema();
