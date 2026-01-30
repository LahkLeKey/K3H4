import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  provider: SortOrderSchema.optional(),
  signature: SortOrderSchema.optional(),
  originLat: SortOrderSchema.optional(),
  originLng: SortOrderSchema.optional(),
  destinationLat: SortOrderSchema.optional(),
  destinationLng: SortOrderSchema.optional(),
  distanceKm: SortOrderSchema.optional(),
  durationMinutes: SortOrderSchema.optional(),
  expiresAt: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional()
}).strict();
export const GeoRouteCacheMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.GeoRouteCacheMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoRouteCacheMinOrderByAggregateInput>;
export const GeoRouteCacheMinOrderByAggregateInputObjectZodSchema = makeSchema();
