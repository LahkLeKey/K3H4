import * as z from 'zod';

export const PoiScalarFieldEnumSchema = z.enum(['id', 'osmType', 'osmId', 'name', 'category', 'latitude', 'longitude', 'tags', 'source', 'lastSeenAt', 'createdAt', 'updatedAt', 'buildingId'])

export type PoiScalarFieldEnum = z.infer<typeof PoiScalarFieldEnumSchema>;