import * as z from 'zod';

export const FreightLoadScalarFieldEnumSchema = z.enum(['id', 'userId', 'title', 'originName', 'originLat', 'originLng', 'destinationName', 'destinationLat', 'destinationLng', 'distanceKm', 'durationMinutes', 'cost', 'status', 'routeGeoJson', 'createdAt', 'updatedAt'])

export type FreightLoadScalarFieldEnum = z.infer<typeof FreightLoadScalarFieldEnumSchema>;