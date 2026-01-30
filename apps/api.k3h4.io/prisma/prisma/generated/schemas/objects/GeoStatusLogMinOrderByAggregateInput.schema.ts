import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  poiStatus: SortOrderSchema.optional(),
  centerLat: SortOrderSchema.optional(),
  centerLng: SortOrderSchema.optional(),
  error: SortOrderSchema.optional(),
  userAgent: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional()
}).strict();
export const GeoStatusLogMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.GeoStatusLogMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoStatusLogMinOrderByAggregateInput>;
export const GeoStatusLogMinOrderByAggregateInputObjectZodSchema = makeSchema();
