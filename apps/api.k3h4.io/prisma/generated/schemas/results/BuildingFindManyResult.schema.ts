import * as z from 'zod';
export const BuildingFindManyResultSchema = z.object({
  data: z.array(z.object({
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
})),
  pagination: z.object({
  page: z.number().int().min(1),
  pageSize: z.number().int().min(1),
  total: z.number().int().min(0),
  totalPages: z.number().int().min(0),
  hasNext: z.boolean(),
  hasPrev: z.boolean()
})
});