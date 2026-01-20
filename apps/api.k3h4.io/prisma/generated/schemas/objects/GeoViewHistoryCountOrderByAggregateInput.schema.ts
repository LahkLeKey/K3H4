import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  signature: SortOrderSchema.optional(),
  zoomBand: SortOrderSchema.optional(),
  bboxMinLat: SortOrderSchema.optional(),
  bboxMinLng: SortOrderSchema.optional(),
  bboxMaxLat: SortOrderSchema.optional(),
  bboxMaxLng: SortOrderSchema.optional(),
  lastPoiIds: SortOrderSchema.optional(),
  lastPoiCount: SortOrderSchema.optional(),
  firstViewedAt: SortOrderSchema.optional(),
  lastViewedAt: SortOrderSchema.optional(),
  viewCount: SortOrderSchema.optional(),
  staleAfter: SortOrderSchema.optional()
}).strict();
export const GeoViewHistoryCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.GeoViewHistoryCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoViewHistoryCountOrderByAggregateInput>;
export const GeoViewHistoryCountOrderByAggregateInputObjectZodSchema = makeSchema();
