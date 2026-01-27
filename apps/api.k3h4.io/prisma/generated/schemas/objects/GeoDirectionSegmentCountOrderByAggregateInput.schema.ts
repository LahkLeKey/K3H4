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
  geometry: SortOrderSchema.optional(),
  metadata: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional()
}).strict();
export const GeoDirectionSegmentCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.GeoDirectionSegmentCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionSegmentCountOrderByAggregateInput>;
export const GeoDirectionSegmentCountOrderByAggregateInputObjectZodSchema = makeSchema();
