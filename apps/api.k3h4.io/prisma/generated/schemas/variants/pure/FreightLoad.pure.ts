import * as z from 'zod';
import { LifecycleStatusSchema } from '../../enums/LifecycleStatus.schema';
// prettier-ignore
export const FreightLoadModelSchema = z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    title: z.string(),
    originName: z.string(),
    originLat: z.number(),
    originLng: z.number(),
    destinationName: z.string(),
    destinationLat: z.number(),
    destinationLng: z.number(),
    distanceKm: z.number(),
    durationMinutes: z.number().int(),
    cost: z.number(),
    status: LifecycleStatusSchema,
    routeGeoJson: z.unknown().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    warehouseItems: z.array(z.unknown())
}).strict();

export type FreightLoadPureType = z.infer<typeof FreightLoadModelSchema>;
