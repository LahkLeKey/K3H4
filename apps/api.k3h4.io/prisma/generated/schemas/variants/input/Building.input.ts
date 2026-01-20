import * as z from 'zod';
import { BuildingTypeSchema } from '../../enums/BuildingType.schema';
// prettier-ignore
export const BuildingInputSchema = z.object({
    id: z.number().int(),
    osmId: z.bigint().optional().nullable(),
    type: BuildingTypeSchema,
    addressHouseNumber: z.string().optional().nullable(),
    addressStreet: z.string().optional().nullable(),
    addressCity: z.string().optional().nullable(),
    addressPostcode: z.string().optional().nullable(),
    addressState: z.string().optional().nullable(),
    addressCountry: z.string().optional().nullable(),
    geometry: z.unknown().optional().nullable(),
    POIs: z.array(z.unknown())
}).strict();

export type BuildingInputType = z.infer<typeof BuildingInputSchema>;
