import * as z from 'zod';

export const BuildingScalarFieldEnumSchema = z.enum(['id', 'osmId', 'type', 'addressHouseNumber', 'addressStreet', 'addressCity', 'addressPostcode', 'addressState', 'addressCountry', 'geometry'])

export type BuildingScalarFieldEnum = z.infer<typeof BuildingScalarFieldEnumSchema>;