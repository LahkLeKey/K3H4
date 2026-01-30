import * as z from 'zod';
// prettier-ignore
export const UserPreferenceResultSchema = z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    theme: z.string(),
    locale: z.string(),
    timezone: z.string(),
    marketingOptIn: z.boolean(),
    note: z.string().nullable(),
    lastCenterLat: z.number().nullable(),
    lastCenterLng: z.number().nullable(),
    lastZoom: z.number().nullable(),
    lastBearing: z.number().nullable(),
    lastPitch: z.number().nullable(),
    lastPoiSignature: z.string().nullable(),
    lastPoiKinds: z.string().nullable(),
    lastPoiRadiusM: z.number().int().nullable(),
    lastPoiCount: z.number().int().nullable(),
    lastPoiFetchedAt: z.date().nullable(),
    maptilerStyle: z.string(),
    maptilerLanguage: z.string(),
    maptilerLastPath: z.string().nullable(),
    maptilerLastParams: z.unknown().nullable(),
    maptilerLastKind: z.string().nullable(),
    maptilerLastSignature: z.string().nullable(),
    maptilerLastFetchedAt: z.date().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type UserPreferenceResultType = z.infer<typeof UserPreferenceResultSchema>;
