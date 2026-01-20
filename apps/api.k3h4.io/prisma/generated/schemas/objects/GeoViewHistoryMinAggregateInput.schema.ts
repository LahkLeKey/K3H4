import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  signature: z.literal(true).optional(),
  zoomBand: z.literal(true).optional(),
  bboxMinLat: z.literal(true).optional(),
  bboxMinLng: z.literal(true).optional(),
  bboxMaxLat: z.literal(true).optional(),
  bboxMaxLng: z.literal(true).optional(),
  lastPoiCount: z.literal(true).optional(),
  firstViewedAt: z.literal(true).optional(),
  lastViewedAt: z.literal(true).optional(),
  viewCount: z.literal(true).optional(),
  staleAfter: z.literal(true).optional()
}).strict();
export const GeoViewHistoryMinAggregateInputObjectSchema: z.ZodType<Prisma.GeoViewHistoryMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.GeoViewHistoryMinAggregateInputType>;
export const GeoViewHistoryMinAggregateInputObjectZodSchema = makeSchema();
