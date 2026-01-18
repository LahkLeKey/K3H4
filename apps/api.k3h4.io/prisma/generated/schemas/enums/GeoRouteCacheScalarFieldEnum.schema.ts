import * as z from 'zod';

export const GeoRouteCacheScalarFieldEnumSchema = z.enum(['id', 'userId', 'provider', 'signature', 'originLat', 'originLng', 'destinationLat', 'destinationLng', 'distanceKm', 'durationMinutes', 'geojson', 'expiresAt', 'createdAt'])

export type GeoRouteCacheScalarFieldEnum = z.infer<typeof GeoRouteCacheScalarFieldEnumSchema>;