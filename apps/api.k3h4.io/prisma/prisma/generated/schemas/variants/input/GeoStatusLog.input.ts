import * as z from 'zod';
// prettier-ignore
export const GeoStatusLogInputSchema = z.object({
    id: z.string(),
    userId: z.string().optional().nullable(),
    user: z.unknown().optional().nullable(),
    status: z.string(),
    poiStatus: z.string().optional().nullable(),
    centerLat: z.number().optional().nullable(),
    centerLng: z.number().optional().nullable(),
    error: z.string().optional().nullable(),
    userAgent: z.string().optional().nullable(),
    createdAt: z.date()
}).strict();

export type GeoStatusLogInputType = z.infer<typeof GeoStatusLogInputSchema>;
