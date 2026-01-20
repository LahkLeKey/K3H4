import * as z from 'zod';
// prettier-ignore
export const UserPreferenceInputSchema = z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    theme: z.string(),
    locale: z.string(),
    timezone: z.string(),
    marketingOptIn: z.boolean(),
    note: z.string().optional().nullable(),
    lastCenterLat: z.number().optional().nullable(),
    lastCenterLng: z.number().optional().nullable(),
    lastZoom: z.number().optional().nullable(),
    lastBearing: z.number().optional().nullable(),
    lastPitch: z.number().optional().nullable(),
    lastPoiSignature: z.string().optional().nullable(),
    lastPoiKinds: z.string().optional().nullable(),
    lastPoiRadiusM: z.number().int().optional().nullable(),
    lastPoiCount: z.number().int().optional().nullable(),
    lastPoiFetchedAt: z.date().optional().nullable(),
    maptilerStyle: z.string(),
    maptilerLanguage: z.string(),
    maptilerLastPath: z.string().optional().nullable(),
    maptilerLastParams: z.unknown().optional().nullable(),
    maptilerLastKind: z.string().optional().nullable(),
    maptilerLastSignature: z.string().optional().nullable(),
    maptilerLastFetchedAt: z.date().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type UserPreferenceInputType = z.infer<typeof UserPreferenceInputSchema>;
