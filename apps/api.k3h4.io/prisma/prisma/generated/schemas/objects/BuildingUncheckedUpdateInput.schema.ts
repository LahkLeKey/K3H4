import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { NullableBigIntFieldUpdateOperationsInputObjectSchema as NullableBigIntFieldUpdateOperationsInputObjectSchema } from './NullableBigIntFieldUpdateOperationsInput.schema';
import { BuildingTypeSchema } from '../enums/BuildingType.schema';
import { EnumBuildingTypeFieldUpdateOperationsInputObjectSchema as EnumBuildingTypeFieldUpdateOperationsInputObjectSchema } from './EnumBuildingTypeFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { PoiUncheckedUpdateManyWithoutBuildingNestedInputObjectSchema as PoiUncheckedUpdateManyWithoutBuildingNestedInputObjectSchema } from './PoiUncheckedUpdateManyWithoutBuildingNestedInput.schema'

import { JsonValueSchema as jsonSchema } from '../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  osmId: z.union([z.bigint(), z.lazy(() => NullableBigIntFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  type: z.union([BuildingTypeSchema, z.lazy(() => EnumBuildingTypeFieldUpdateOperationsInputObjectSchema)]).optional(),
  addressHouseNumber: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  addressStreet: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  addressCity: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  addressPostcode: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  addressState: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  addressCountry: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  geometry: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  POIs: z.lazy(() => PoiUncheckedUpdateManyWithoutBuildingNestedInputObjectSchema).optional()
}).strict();
export const BuildingUncheckedUpdateInputObjectSchema: z.ZodType<Prisma.BuildingUncheckedUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.BuildingUncheckedUpdateInput>;
export const BuildingUncheckedUpdateInputObjectZodSchema = makeSchema();
