import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { AgriculturePlotConditionUncheckedCreateNestedManyWithoutPlotInputObjectSchema as AgriculturePlotConditionUncheckedCreateNestedManyWithoutPlotInputObjectSchema } from './AgriculturePlotConditionUncheckedCreateNestedManyWithoutPlotInput.schema';
import { AgricultureTaskUncheckedCreateNestedManyWithoutPlotInputObjectSchema as AgricultureTaskUncheckedCreateNestedManyWithoutPlotInputObjectSchema } from './AgricultureTaskUncheckedCreateNestedManyWithoutPlotInput.schema';
import { AgricultureSlotUncheckedCreateNestedManyWithoutPlotInputObjectSchema as AgricultureSlotUncheckedCreateNestedManyWithoutPlotInputObjectSchema } from './AgricultureSlotUncheckedCreateNestedManyWithoutPlotInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  userId: z.string(),
  name: z.string(),
  fieldCode: z.string().optional().nullable(),
  crop: z.string(),
  stage: z.string(),
  acres: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'acres' must be a Decimal",
}),
  health: z.string().optional(),
  soilType: z.string().optional().nullable(),
  irrigationZone: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  lastConditionAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  conditions: z.lazy(() => AgriculturePlotConditionUncheckedCreateNestedManyWithoutPlotInputObjectSchema).optional(),
  tasks: z.lazy(() => AgricultureTaskUncheckedCreateNestedManyWithoutPlotInputObjectSchema).optional(),
  slots: z.lazy(() => AgricultureSlotUncheckedCreateNestedManyWithoutPlotInputObjectSchema).optional()
}).strict();
export const AgriculturePlotUncheckedCreateWithoutCropPlansInputObjectSchema: z.ZodType<Prisma.AgriculturePlotUncheckedCreateWithoutCropPlansInput> = makeSchema() as unknown as z.ZodType<Prisma.AgriculturePlotUncheckedCreateWithoutCropPlansInput>;
export const AgriculturePlotUncheckedCreateWithoutCropPlansInputObjectZodSchema = makeSchema();
