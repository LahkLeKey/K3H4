import * as z from 'zod';

export const GeoDirectionStopScalarFieldEnumSchema = z.enum(['id', 'directionId', 'sequence', 'latitude', 'longitude', 'label', 'address', 'source', 'osmId', 'metadata', 'createdAt'])

export type GeoDirectionStopScalarFieldEnum = z.infer<typeof GeoDirectionStopScalarFieldEnumSchema>;