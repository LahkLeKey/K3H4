import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { UserUpdateOneRequiredWithoutWarehouseItemsNestedInputObjectSchema as UserUpdateOneRequiredWithoutWarehouseItemsNestedInputObjectSchema } from './UserUpdateOneRequiredWithoutWarehouseItemsNestedInput.schema';
import { FreightLoadUpdateOneWithoutWarehouseItemsNestedInputObjectSchema as FreightLoadUpdateOneWithoutWarehouseItemsNestedInputObjectSchema } from './FreightLoadUpdateOneWithoutWarehouseItemsNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  sku: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  description: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  quantity: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  location: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  status: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutWarehouseItemsNestedInputObjectSchema).optional(),
  freightLoad: z.lazy(() => FreightLoadUpdateOneWithoutWarehouseItemsNestedInputObjectSchema).optional()
}).strict();
export const WarehouseItemUpdateInputObjectSchema: z.ZodType<Prisma.WarehouseItemUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.WarehouseItemUpdateInput>;
export const WarehouseItemUpdateInputObjectZodSchema = makeSchema();
