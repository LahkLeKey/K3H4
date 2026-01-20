import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { NullableBigIntFieldUpdateOperationsInputObjectSchema as NullableBigIntFieldUpdateOperationsInputObjectSchema } from './NullableBigIntFieldUpdateOperationsInput.schema';
import { BuildingTypeSchema } from '../enums/BuildingType.schema';
import { EnumBuildingTypeFieldUpdateOperationsInputObjectSchema as EnumBuildingTypeFieldUpdateOperationsInputObjectSchema } from './EnumBuildingTypeFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  osmId: z.union([z.bigint(), z.lazy(() => NullableBigIntFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  type: z.union([BuildingTypeSchema, z.lazy(() => EnumBuildingTypeFieldUpdateOperationsInputObjectSchema)]).optional(),
  addressHouseNumber: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  addressStreet: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  addressCity: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  addressPostcode: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  addressState: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  addressCountry: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  geometry: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional()
}).strict();
export const BuildingUpdateManyMutationInputObjectSchema: z.ZodType<Prisma.BuildingUpdateManyMutationInput> = makeSchema() as unknown as z.ZodType<Prisma.BuildingUpdateManyMutationInput>;
export const BuildingUpdateManyMutationInputObjectZodSchema = makeSchema();
