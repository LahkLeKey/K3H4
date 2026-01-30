import * as z from 'zod';

export const GeoPoiCacheScalarFieldEnumSchema = z.enum(['id', 'userId', 'signature', 'centerLat', 'centerLng', 'radiusM', 'kinds', 'pois', 'count', 'expiresAt', 'createdAt'])

export type GeoPoiCacheScalarFieldEnum = z.infer<typeof GeoPoiCacheScalarFieldEnumSchema>;