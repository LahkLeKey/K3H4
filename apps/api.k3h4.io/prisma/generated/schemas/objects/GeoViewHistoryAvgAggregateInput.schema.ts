import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  zoomBand: z.literal(true).optional(),
  bboxMinLat: z.literal(true).optional(),
  bboxMinLng: z.literal(true).optional(),
  bboxMaxLat: z.literal(true).optional(),
  bboxMaxLng: z.literal(true).optional(),
  lastPoiCount: z.literal(true).optional(),
  viewCount: z.literal(true).optional()
}).strict();
export const GeoViewHistoryAvgAggregateInputObjectSchema: z.ZodType<Prisma.GeoViewHistoryAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.GeoViewHistoryAvgAggregateInputType>;
export const GeoViewHistoryAvgAggregateInputObjectZodSchema = makeSchema();
