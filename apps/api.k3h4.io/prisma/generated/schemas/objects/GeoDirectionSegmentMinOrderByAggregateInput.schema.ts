import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  directionId: SortOrderSchema.optional(),
  sequence: SortOrderSchema.optional(),
  instruction: SortOrderSchema.optional(),
  maneuverType: SortOrderSchema.optional(),
  maneuverModifier: SortOrderSchema.optional(),
  distanceMeters: SortOrderSchema.optional(),
  durationSeconds: SortOrderSchema.optional(),
  startLat: SortOrderSchema.optional(),
  startLng: SortOrderSchema.optional(),
  endLat: SortOrderSchema.optional(),
  endLng: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional()
}).strict();
export const GeoDirectionSegmentMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.GeoDirectionSegmentMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionSegmentMinOrderByAggregateInput>;
export const GeoDirectionSegmentMinOrderByAggregateInputObjectZodSchema = makeSchema();
