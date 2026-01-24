import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  dataset: z.literal(true).optional(),
  code: z.literal(true).optional(),
  name: z.literal(true).optional(),
  wikidataId: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const UsdaUnitMaxAggregateInputObjectSchema: z.ZodType<Prisma.UsdaUnitMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.UsdaUnitMaxAggregateInputType>;
export const UsdaUnitMaxAggregateInputObjectZodSchema = makeSchema();
