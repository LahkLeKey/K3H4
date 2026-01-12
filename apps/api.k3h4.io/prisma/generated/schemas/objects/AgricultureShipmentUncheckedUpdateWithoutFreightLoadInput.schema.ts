import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema as NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { AgricultureInventoryMovementUncheckedUpdateManyWithoutShipmentNestedInputObjectSchema as AgricultureInventoryMovementUncheckedUpdateManyWithoutShipmentNestedInputObjectSchema } from './AgricultureInventoryMovementUncheckedUpdateManyWithoutShipmentNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  userId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  lot: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  destination: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  mode: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  eta: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  inventoryMovements: z.lazy(() => AgricultureInventoryMovementUncheckedUpdateManyWithoutShipmentNestedInputObjectSchema).optional()
}).strict();
export const AgricultureShipmentUncheckedUpdateWithoutFreightLoadInputObjectSchema: z.ZodType<Prisma.AgricultureShipmentUncheckedUpdateWithoutFreightLoadInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureShipmentUncheckedUpdateWithoutFreightLoadInput>;
export const AgricultureShipmentUncheckedUpdateWithoutFreightLoadInputObjectZodSchema = makeSchema();
