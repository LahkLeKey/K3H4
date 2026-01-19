import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  centerLat: SortOrderSchema.optional(),
  centerLng: SortOrderSchema.optional(),
  radiusM: SortOrderSchema.optional(),
  count: SortOrderSchema.optional()
}).strict();
export const GeoPoiCacheAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.GeoPoiCacheAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoPoiCacheAvgOrderByAggregateInput>;
export const GeoPoiCacheAvgOrderByAggregateInputObjectZodSchema = makeSchema();
