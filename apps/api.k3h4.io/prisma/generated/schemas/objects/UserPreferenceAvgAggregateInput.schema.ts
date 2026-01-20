import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  lastCenterLat: z.literal(true).optional(),
  lastCenterLng: z.literal(true).optional(),
  lastZoom: z.literal(true).optional(),
  lastBearing: z.literal(true).optional(),
  lastPitch: z.literal(true).optional(),
  lastPoiRadiusM: z.literal(true).optional(),
  lastPoiCount: z.literal(true).optional()
}).strict();
export const UserPreferenceAvgAggregateInputObjectSchema: z.ZodType<Prisma.UserPreferenceAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.UserPreferenceAvgAggregateInputType>;
export const UserPreferenceAvgAggregateInputObjectZodSchema = makeSchema();
