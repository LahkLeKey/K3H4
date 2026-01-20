import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  zoomBand: SortOrderSchema.optional(),
  bboxMinLat: SortOrderSchema.optional(),
  bboxMinLng: SortOrderSchema.optional(),
  bboxMaxLat: SortOrderSchema.optional(),
  bboxMaxLng: SortOrderSchema.optional(),
  lastPoiCount: SortOrderSchema.optional(),
  viewCount: SortOrderSchema.optional()
}).strict();
export const GeoViewHistoryAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.GeoViewHistoryAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoViewHistoryAvgOrderByAggregateInput>;
export const GeoViewHistoryAvgOrderByAggregateInputObjectZodSchema = makeSchema();
