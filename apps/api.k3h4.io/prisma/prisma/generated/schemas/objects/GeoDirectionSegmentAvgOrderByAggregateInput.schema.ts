import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  sequence: SortOrderSchema.optional(),
  distanceMeters: SortOrderSchema.optional(),
  durationSeconds: SortOrderSchema.optional(),
  startLat: SortOrderSchema.optional(),
  startLng: SortOrderSchema.optional(),
  endLat: SortOrderSchema.optional(),
  endLng: SortOrderSchema.optional()
}).strict();
export const GeoDirectionSegmentAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.GeoDirectionSegmentAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionSegmentAvgOrderByAggregateInput>;
export const GeoDirectionSegmentAvgOrderByAggregateInputObjectZodSchema = makeSchema();
