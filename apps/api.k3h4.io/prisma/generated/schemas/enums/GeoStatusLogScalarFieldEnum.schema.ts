import * as z from 'zod';

export const GeoStatusLogScalarFieldEnumSchema = z.enum(['id', 'userId', 'status', 'poiStatus', 'centerLat', 'centerLng', 'error', 'userAgent', 'createdAt'])

export type GeoStatusLogScalarFieldEnum = z.infer<typeof GeoStatusLogScalarFieldEnumSchema>;