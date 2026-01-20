import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { BuildingTypeSchema } from '../enums/BuildingType.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

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
  geometry: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional()
}).strict();
export const BuildingUncheckedCreateWithoutPOIsInputObjectSchema: z.ZodType<Prisma.BuildingUncheckedCreateWithoutPOIsInput> = makeSchema() as unknown as z.ZodType<Prisma.BuildingUncheckedCreateWithoutPOIsInput>;
export const BuildingUncheckedCreateWithoutPOIsInputObjectZodSchema = makeSchema();
