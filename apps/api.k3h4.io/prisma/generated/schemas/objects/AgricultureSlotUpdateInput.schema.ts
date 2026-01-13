import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { DecimalFieldUpdateOperationsInputObjectSchema as DecimalFieldUpdateOperationsInputObjectSchema } from './DecimalFieldUpdateOperationsInput.schema';
import { UserUpdateOneRequiredWithoutAgricultureSlotsNestedInputObjectSchema as UserUpdateOneRequiredWithoutAgricultureSlotsNestedInputObjectSchema } from './UserUpdateOneRequiredWithoutAgricultureSlotsNestedInput.schema';
import { AgriculturePlotUpdateOneWithoutSlotsNestedInputObjectSchema as AgriculturePlotUpdateOneWithoutSlotsNestedInputObjectSchema } from './AgriculturePlotUpdateOneWithoutSlotsNestedInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  slotIndex: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  unlockedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  costPaid: z.union([z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'costPaid' must be a Decimal",
}), z.lazy(() => DecimalFieldUpdateOperationsInputObjectSchema)]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAgricultureSlotsNestedInputObjectSchema).optional(),
  plot: z.lazy(() => AgriculturePlotUpdateOneWithoutSlotsNestedInputObjectSchema).optional()
}).strict();
export const AgricultureSlotUpdateInputObjectSchema: z.ZodType<Prisma.AgricultureSlotUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureSlotUpdateInput>;
export const AgricultureSlotUpdateInputObjectZodSchema = makeSchema();
