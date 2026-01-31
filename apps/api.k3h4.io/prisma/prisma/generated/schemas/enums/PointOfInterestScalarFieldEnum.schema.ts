import * as z from 'zod';

export const PointOfInterestScalarFieldEnumSchema = z.enum(['id', 'osmType', 'osmId', 'name', 'category', 'latitude', 'longitude', 'tags', 'source', 'lastSeenAt', 'createdAt', 'updatedAt'])

export type PointOfInterestScalarFieldEnum = z.infer<typeof PointOfInterestScalarFieldEnumSchema>;