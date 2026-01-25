import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { LifecycleStatusSchema } from '../enums/LifecycleStatus.schema';
import { EnumLifecycleStatusFieldUpdateOperationsInputObjectSchema as EnumLifecycleStatusFieldUpdateOperationsInputObjectSchema } from './EnumLifecycleStatusFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema as NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { AgriculturePlotUpdateOneRequiredWithoutCropPlansNestedInputObjectSchema as AgriculturePlotUpdateOneRequiredWithoutCropPlansNestedInputObjectSchema } from './AgriculturePlotUpdateOneRequiredWithoutCropPlansNestedInput.schema';
import { AgricultureTaskUpdateManyWithoutCropPlanNestedInputObjectSchema as AgricultureTaskUpdateManyWithoutCropPlanNestedInputObjectSchema } from './AgricultureTaskUpdateManyWithoutCropPlanNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  crop: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  phase: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  status: z.union([LifecycleStatusSchema, z.lazy(() => EnumLifecycleStatusFieldUpdateOperationsInputObjectSchema)]).optional(),
  startDate: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  targetHarvestDate: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  endDate: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  notes: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  plot: z.lazy(() => AgriculturePlotUpdateOneRequiredWithoutCropPlansNestedInputObjectSchema).optional(),
  tasks: z.lazy(() => AgricultureTaskUpdateManyWithoutCropPlanNestedInputObjectSchema).optional()
}).strict();
export const AgricultureCropPlanUpdateWithoutUserInputObjectSchema: z.ZodType<Prisma.AgricultureCropPlanUpdateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureCropPlanUpdateWithoutUserInput>;
export const AgricultureCropPlanUpdateWithoutUserInputObjectZodSchema = makeSchema();
