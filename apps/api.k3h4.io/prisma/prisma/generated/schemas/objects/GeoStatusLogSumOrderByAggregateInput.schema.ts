import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  centerLat: SortOrderSchema.optional(),
  centerLng: SortOrderSchema.optional()
}).strict();
export const GeoStatusLogSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.GeoStatusLogSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoStatusLogSumOrderByAggregateInput>;
export const GeoStatusLogSumOrderByAggregateInputObjectZodSchema = makeSchema();
