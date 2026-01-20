import * as z from 'zod';
import { BuildingTypeSchema } from '../../enums/BuildingType.schema';
// prettier-ignore
export const BuildingModelSchema = z.object({
    id: z.number().int(),
    osmId: z.bigint().nullable(),
    type: BuildingTypeSchema,
    addressHouseNumber: z.string().nullable(),
    addressStreet: z.string().nullable(),
    addressCity: z.string().nullable(),
    addressPostcode: z.string().nullable(),
    addressState: z.string().nullable(),
    addressCountry: z.string().nullable(),
    geometry: z.unknown().nullable(),
    POIs: z.array(z.unknown())
}).strict();

export type BuildingPureType = z.infer<typeof BuildingModelSchema>;
