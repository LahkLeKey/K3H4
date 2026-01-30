import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { BuildingTypeSchema } from '../enums/BuildingType.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { PoiCreateNestedManyWithoutBuildingInputObjectSchema as PoiCreateNestedManyWithoutBuildingInputObjectSchema } from './PoiCreateNestedManyWithoutBuildingInput.schema'

import { JsonValueSchema as jsonSchema } from '../helpers/json-helpers';

const makeSchema = () => z.object({
  osmId: z.bigint().optional().nullable(),
  type: BuildingTypeSchema,
  addressHouseNumber: z.string().optional().nullable(),
  addressStreet: z.string().optional().nullable(),
  addressCity: z.string().optional().nullable(),
  addressPostcode: z.string().optional().nullable(),
  addressState: z.string().optional().nullable(),
  addressCountry: z.string().optional().nullable(),
  geometry: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  POIs: z.lazy(() => PoiCreateNestedManyWithoutBuildingInputObjectSchema).optional()
}).strict();
export const BuildingCreateInputObjectSchema: z.ZodType<Prisma.BuildingCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.BuildingCreateInput>;
export const BuildingCreateInputObjectZodSchema = makeSchema();
