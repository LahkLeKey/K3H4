import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  signature: SortOrderSchema.optional(),
  centerLat: SortOrderSchema.optional(),
  centerLng: SortOrderSchema.optional(),
  radiusM: SortOrderSchema.optional(),
  kinds: SortOrderSchema.optional(),
  count: SortOrderSchema.optional(),
  expiresAt: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional()
}).strict();
export const GeoPoiCacheMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.GeoPoiCacheMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoPoiCacheMaxOrderByAggregateInput>;
export const GeoPoiCacheMaxOrderByAggregateInputObjectZodSchema = makeSchema();
