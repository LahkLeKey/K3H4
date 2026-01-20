import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  lastCenterLat: SortOrderSchema.optional(),
  lastCenterLng: SortOrderSchema.optional(),
  lastZoom: SortOrderSchema.optional(),
  lastBearing: SortOrderSchema.optional(),
  lastPitch: SortOrderSchema.optional(),
  lastPoiRadiusM: SortOrderSchema.optional(),
  lastPoiCount: SortOrderSchema.optional()
}).strict();
export const UserPreferenceSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.UserPreferenceSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.UserPreferenceSumOrderByAggregateInput>;
export const UserPreferenceSumOrderByAggregateInputObjectZodSchema = makeSchema();
