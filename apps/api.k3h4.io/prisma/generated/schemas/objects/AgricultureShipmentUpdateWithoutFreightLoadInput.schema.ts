import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema as NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { UserUpdateOneRequiredWithoutAgricultureShipmentsNestedInputObjectSchema as UserUpdateOneRequiredWithoutAgricultureShipmentsNestedInputObjectSchema } from './UserUpdateOneRequiredWithoutAgricultureShipmentsNestedInput.schema';
import { AgricultureInventoryMovementUpdateManyWithoutShipmentNestedInputObjectSchema as AgricultureInventoryMovementUpdateManyWithoutShipmentNestedInputObjectSchema } from './AgricultureInventoryMovementUpdateManyWithoutShipmentNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  lot: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  destination: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  mode: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  eta: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAgricultureShipmentsNestedInputObjectSchema).optional(),
  inventoryMovements: z.lazy(() => AgricultureInventoryMovementUpdateManyWithoutShipmentNestedInputObjectSchema).optional()
}).strict();
export const AgricultureShipmentUpdateWithoutFreightLoadInputObjectSchema: z.ZodType<Prisma.AgricultureShipmentUpdateWithoutFreightLoadInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureShipmentUpdateWithoutFreightLoadInput>;
export const AgricultureShipmentUpdateWithoutFreightLoadInputObjectZodSchema = makeSchema();
