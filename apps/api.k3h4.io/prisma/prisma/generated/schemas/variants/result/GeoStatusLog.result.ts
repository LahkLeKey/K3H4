import * as z from 'zod';
// prettier-ignore
export const GeoStatusLogResultSchema = z.object({
    id: z.string(),
    userId: z.string().nullable(),
    user: z.unknown().nullable(),
    status: z.string(),
    poiStatus: z.string().nullable(),
    centerLat: z.number().nullable(),
    centerLng: z.number().nullable(),
    error: z.string().nullable(),
    userAgent: z.string().nullable(),
    createdAt: z.date()
}).strict();

export type GeoStatusLogResultType = z.infer<typeof GeoStatusLogResultSchema>;
