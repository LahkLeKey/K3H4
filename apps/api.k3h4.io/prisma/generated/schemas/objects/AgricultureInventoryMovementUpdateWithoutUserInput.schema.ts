import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { DecimalFieldUpdateOperationsInputObjectSchema as DecimalFieldUpdateOperationsInputObjectSchema } from './DecimalFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { AgricultureInventoryUpdateOneRequiredWithoutMovementsNestedInputObjectSchema as AgricultureInventoryUpdateOneRequiredWithoutMovementsNestedInputObjectSchema } from './AgricultureInventoryUpdateOneRequiredWithoutMovementsNestedInput.schema';
import { AgricultureShipmentUpdateOneWithoutInventoryMovementsNestedInputObjectSchema as AgricultureShipmentUpdateOneWithoutInventoryMovementsNestedInputObjectSchema } from './AgricultureShipmentUpdateOneWithoutInventoryMovementsNestedInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  type: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  quantity: z.union([z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'quantity' must be a Decimal",
}), z.lazy(() => DecimalFieldUpdateOperationsInputObjectSchema)]).optional(),
  reason: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  inventory: z.lazy(() => AgricultureInventoryUpdateOneRequiredWithoutMovementsNestedInputObjectSchema).optional(),
  shipment: z.lazy(() => AgricultureShipmentUpdateOneWithoutInventoryMovementsNestedInputObjectSchema).optional()
}).strict();
export const AgricultureInventoryMovementUpdateWithoutUserInputObjectSchema: z.ZodType<Prisma.AgricultureInventoryMovementUpdateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureInventoryMovementUpdateWithoutUserInput>;
export const AgricultureInventoryMovementUpdateWithoutUserInputObjectZodSchema = makeSchema();
