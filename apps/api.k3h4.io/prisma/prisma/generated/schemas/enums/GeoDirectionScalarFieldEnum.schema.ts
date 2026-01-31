import * as z from 'zod';

export const GeoDirectionScalarFieldEnumSchema = z.enum(['id', 'userId', 'actorId', 'provider', 'profile', 'signature', 'inputPoints', 'originLat', 'originLng', 'destinationLat', 'destinationLng', 'distanceMeters', 'durationSeconds', 'geometry', 'instructions', 'payload', 'statusCode', 'statusMessage', 'expiresAt', 'createdAt', 'updatedAt'])

export type GeoDirectionScalarFieldEnum = z.infer<typeof GeoDirectionScalarFieldEnumSchema>;