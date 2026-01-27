import * as z from 'zod';

export const GeoDirectionSegmentScalarFieldEnumSchema = z.enum(['id', 'directionId', 'sequence', 'instruction', 'maneuverType', 'maneuverModifier', 'distanceMeters', 'durationSeconds', 'startLat', 'startLng', 'endLat', 'endLng', 'geometry', 'metadata', 'createdAt'])

export type GeoDirectionSegmentScalarFieldEnum = z.infer<typeof GeoDirectionSegmentScalarFieldEnumSchema>;