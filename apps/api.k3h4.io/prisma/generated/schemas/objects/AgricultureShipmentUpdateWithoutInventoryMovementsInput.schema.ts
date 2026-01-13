import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema as NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { UserUpdateOneRequiredWithoutAgricultureShipmentsNestedInputObjectSchema as UserUpdateOneRequiredWithoutAgricultureShipmentsNestedInputObjectSchema } from './UserUpdateOneRequiredWithoutAgricultureShipmentsNestedInput.schema';
import { FreightLoadUpdateOneWithoutAgricultureShipmentsNestedInputObjectSchema as FreightLoadUpdateOneWithoutAgricultureShipmentsNestedInputObjectSchema } from './FreightLoadUpdateOneWithoutAgricultureShipmentsNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  lot: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  destination: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  mode: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  eta: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAgricultureShipmentsNestedInputObjectSchema).optional(),
  freightLoad: z.lazy(() => FreightLoadUpdateOneWithoutAgricultureShipmentsNestedInputObjectSchema).optional()
}).strict();
export const AgricultureShipmentUpdateWithoutInventoryMovementsInputObjectSchema: z.ZodType<Prisma.AgricultureShipmentUpdateWithoutInventoryMovementsInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureShipmentUpdateWithoutInventoryMovementsInput>;
export const AgricultureShipmentUpdateWithoutInventoryMovementsInputObjectZodSchema = makeSchema();
