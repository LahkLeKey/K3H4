import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { BuildingTypeSchema } from '../enums/BuildingType.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { PoiUncheckedCreateNestedManyWithoutBuildingInputObjectSchema as PoiUncheckedCreateNestedManyWithoutBuildingInputObjectSchema } from './PoiUncheckedCreateNestedManyWithoutBuildingInput.schema'

import { JsonValueSchema as jsonSchema } from '../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.number().int().optional(),
  osmId: z.bigint().optional().nullable(),
  type: BuildingTypeSchema,
  addressHouseNumber: z.string().optional().nullable(),
  addressStreet: z.string().optional().nullable(),
  addressCity: z.string().optional().nullable(),
  addressPostcode: z.string().optional().nullable(),
  addressState: z.string().optional().nullable(),
  addressCountry: z.string().optional().nullable(),
  geometry: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  POIs: z.lazy(() => PoiUncheckedCreateNestedManyWithoutBuildingInputObjectSchema).optional()
}).strict();
export const BuildingUncheckedCreateInputObjectSchema: z.ZodType<Prisma.BuildingUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.BuildingUncheckedCreateInput>;
export const BuildingUncheckedCreateInputObjectZodSchema = makeSchema();
