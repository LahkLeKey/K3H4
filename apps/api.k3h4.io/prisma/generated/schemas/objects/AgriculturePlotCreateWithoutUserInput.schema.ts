import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { AgricultureCropPlanCreateNestedManyWithoutPlotInputObjectSchema as AgricultureCropPlanCreateNestedManyWithoutPlotInputObjectSchema } from './AgricultureCropPlanCreateNestedManyWithoutPlotInput.schema';
import { AgriculturePlotConditionCreateNestedManyWithoutPlotInputObjectSchema as AgriculturePlotConditionCreateNestedManyWithoutPlotInputObjectSchema } from './AgriculturePlotConditionCreateNestedManyWithoutPlotInput.schema';
import { AgricultureTaskCreateNestedManyWithoutPlotInputObjectSchema as AgricultureTaskCreateNestedManyWithoutPlotInputObjectSchema } from './AgricultureTaskCreateNestedManyWithoutPlotInput.schema';
import { AgricultureSlotCreateNestedManyWithoutPlotInputObjectSchema as AgricultureSlotCreateNestedManyWithoutPlotInputObjectSchema } from './AgricultureSlotCreateNestedManyWithoutPlotInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
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
  cropPlans: z.lazy(() => AgricultureCropPlanCreateNestedManyWithoutPlotInputObjectSchema).optional(),
  conditions: z.lazy(() => AgriculturePlotConditionCreateNestedManyWithoutPlotInputObjectSchema).optional(),
  tasks: z.lazy(() => AgricultureTaskCreateNestedManyWithoutPlotInputObjectSchema).optional(),
  slots: z.lazy(() => AgricultureSlotCreateNestedManyWithoutPlotInputObjectSchema).optional()
}).strict();
export const AgriculturePlotCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.AgriculturePlotCreateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AgriculturePlotCreateWithoutUserInput>;
export const AgriculturePlotCreateWithoutUserInputObjectZodSchema = makeSchema();
