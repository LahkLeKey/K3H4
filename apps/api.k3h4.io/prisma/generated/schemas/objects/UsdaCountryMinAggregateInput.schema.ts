import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  dataset: z.literal(true).optional(),
  code: z.literal(true).optional(),
  name: z.literal(true).optional(),
  regionCode: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const UsdaCountryMinAggregateInputObjectSchema: z.ZodType<Prisma.UsdaCountryMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.UsdaCountryMinAggregateInputType>;
export const UsdaCountryMinAggregateInputObjectZodSchema = makeSchema();
