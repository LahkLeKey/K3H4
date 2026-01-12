import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { DecimalFieldUpdateOperationsInputObjectSchema as DecimalFieldUpdateOperationsInputObjectSchema } from './DecimalFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema as NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { UserUpdateOneRequiredWithoutAgriculturePlotsNestedInputObjectSchema as UserUpdateOneRequiredWithoutAgriculturePlotsNestedInputObjectSchema } from './UserUpdateOneRequiredWithoutAgriculturePlotsNestedInput.schema';
import { AgricultureCropPlanUpdateManyWithoutPlotNestedInputObjectSchema as AgricultureCropPlanUpdateManyWithoutPlotNestedInputObjectSchema } from './AgricultureCropPlanUpdateManyWithoutPlotNestedInput.schema';
import { AgriculturePlotConditionUpdateManyWithoutPlotNestedInputObjectSchema as AgriculturePlotConditionUpdateManyWithoutPlotNestedInputObjectSchema } from './AgriculturePlotConditionUpdateManyWithoutPlotNestedInput.schema';
import { AgricultureTaskUpdateManyWithoutPlotNestedInputObjectSchema as AgricultureTaskUpdateManyWithoutPlotNestedInputObjectSchema } from './AgricultureTaskUpdateManyWithoutPlotNestedInput.schema';
import { AgricultureSlotUpdateManyWithoutPlotNestedInputObjectSchema as AgricultureSlotUpdateManyWithoutPlotNestedInputObjectSchema } from './AgricultureSlotUpdateManyWithoutPlotNestedInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  fieldCode: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  crop: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  stage: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  acres: z.union([z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'acres' must be a Decimal",
}), z.lazy(() => DecimalFieldUpdateOperationsInputObjectSchema)]).optional(),
  health: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  soilType: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  irrigationZone: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  notes: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  lastConditionAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAgriculturePlotsNestedInputObjectSchema).optional(),
  cropPlans: z.lazy(() => AgricultureCropPlanUpdateManyWithoutPlotNestedInputObjectSchema).optional(),
  conditions: z.lazy(() => AgriculturePlotConditionUpdateManyWithoutPlotNestedInputObjectSchema).optional(),
  tasks: z.lazy(() => AgricultureTaskUpdateManyWithoutPlotNestedInputObjectSchema).optional(),
  slots: z.lazy(() => AgricultureSlotUpdateManyWithoutPlotNestedInputObjectSchema).optional()
}).strict();
export const AgriculturePlotUpdateInputObjectSchema: z.ZodType<Prisma.AgriculturePlotUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.AgriculturePlotUpdateInput>;
export const AgriculturePlotUpdateInputObjectZodSchema = makeSchema();
