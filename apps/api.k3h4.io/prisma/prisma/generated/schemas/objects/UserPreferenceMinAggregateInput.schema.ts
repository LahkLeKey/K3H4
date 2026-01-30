import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  theme: z.literal(true).optional(),
  locale: z.literal(true).optional(),
  timezone: z.literal(true).optional(),
  marketingOptIn: z.literal(true).optional(),
  note: z.literal(true).optional(),
  lastCenterLat: z.literal(true).optional(),
  lastCenterLng: z.literal(true).optional(),
  lastZoom: z.literal(true).optional(),
  lastBearing: z.literal(true).optional(),
  lastPitch: z.literal(true).optional(),
  lastPoiSignature: z.literal(true).optional(),
  lastPoiKinds: z.literal(true).optional(),
  lastPoiRadiusM: z.literal(true).optional(),
  lastPoiCount: z.literal(true).optional(),
  lastPoiFetchedAt: z.literal(true).optional(),
  maptilerStyle: z.literal(true).optional(),
  maptilerLanguage: z.literal(true).optional(),
  maptilerLastPath: z.literal(true).optional(),
  maptilerLastKind: z.literal(true).optional(),
  maptilerLastSignature: z.literal(true).optional(),
  maptilerLastFetchedAt: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const UserPreferenceMinAggregateInputObjectSchema: z.ZodType<Prisma.UserPreferenceMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.UserPreferenceMinAggregateInputType>;
export const UserPreferenceMinAggregateInputObjectZodSchema = makeSchema();
