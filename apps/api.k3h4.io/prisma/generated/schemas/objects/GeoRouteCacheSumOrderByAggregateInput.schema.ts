import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  originLat: SortOrderSchema.optional(),
  originLng: SortOrderSchema.optional(),
  destinationLat: SortOrderSchema.optional(),
  destinationLng: SortOrderSchema.optional(),
  distanceKm: SortOrderSchema.optional(),
  durationMinutes: SortOrderSchema.optional()
}).strict();
export const GeoRouteCacheSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.GeoRouteCacheSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoRouteCacheSumOrderByAggregateInput>;
export const GeoRouteCacheSumOrderByAggregateInputObjectZodSchema = makeSchema();
