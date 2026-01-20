import * as z from 'zod';
export const UserPreferenceFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  userId: z.string(),
  user: z.unknown(),
  theme: z.string(),
  locale: z.string(),
  timezone: z.string(),
  marketingOptIn: z.boolean(),
  note: z.string().optional(),
  lastCenterLat: z.number().optional(),
  lastCenterLng: z.number().optional(),
  lastZoom: z.number().optional(),
  lastBearing: z.number().optional(),
  lastPitch: z.number().optional(),
  lastPoiSignature: z.string().optional(),
  lastPoiKinds: z.string().optional(),
  lastPoiRadiusM: z.number().int().optional(),
  lastPoiCount: z.number().int().optional(),
  lastPoiFetchedAt: z.date().optional(),
  maptilerStyle: z.string(),
  maptilerLanguage: z.string(),
  maptilerLastPath: z.string().optional(),
  maptilerLastParams: z.unknown().optional(),
  maptilerLastKind: z.string().optional(),
  maptilerLastSignature: z.string().optional(),
  maptilerLastFetchedAt: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date()
})),
  pagination: z.object({
  page: z.number().int().min(1),
  pageSize: z.number().int().min(1),
  total: z.number().int().min(0),
  totalPages: z.number().int().min(0),
  hasNext: z.boolean(),
  hasPrev: z.boolean()
})
});