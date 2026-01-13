import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { DecimalFieldUpdateOperationsInputObjectSchema as DecimalFieldUpdateOperationsInputObjectSchema } from './DecimalFieldUpdateOperationsInput.schema';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { UserUpdateOneRequiredWithoutPosTicketsNestedInputObjectSchema as UserUpdateOneRequiredWithoutPosTicketsNestedInputObjectSchema } from './UserUpdateOneRequiredWithoutPosTicketsNestedInput.schema';
import { PosLineItemUpdateManyWithoutTicketNestedInputObjectSchema as PosLineItemUpdateManyWithoutTicketNestedInputObjectSchema } from './PosLineItemUpdateManyWithoutTicketNestedInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  total: z.union([z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'total' must be a Decimal",
}), z.lazy(() => DecimalFieldUpdateOperationsInputObjectSchema)]).optional(),
  itemsCount: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  channel: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  status: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutPosTicketsNestedInputObjectSchema).optional(),
  lineItems: z.lazy(() => PosLineItemUpdateManyWithoutTicketNestedInputObjectSchema).optional()
}).strict();
export const PosTicketUpdateWithoutStoreInputObjectSchema: z.ZodType<Prisma.PosTicketUpdateWithoutStoreInput> = makeSchema() as unknown as z.ZodType<Prisma.PosTicketUpdateWithoutStoreInput>;
export const PosTicketUpdateWithoutStoreInputObjectZodSchema = makeSchema();
