import * as z from 'zod';
export const BuildingUpsertResultSchema = z.object({
  id: z.number().int(),
  osmId: z.bigint().optional(),
  type: z.unknown(),
  addressHouseNumber: z.string().optional(),
  addressStreet: z.string().optional(),
  addressCity: z.string().optional(),
  addressPostcode: z.string().optional(),
  addressState: z.string().optional(),
  addressCountry: z.string().optional(),
  geometry: z.unknown().optional(),
  POIs: z.array(z.unknown())
});