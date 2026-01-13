import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { UserCreateNestedOneWithoutAgriculturePlotConditionsInputObjectSchema as UserCreateNestedOneWithoutAgriculturePlotConditionsInputObjectSchema } from './UserCreateNestedOneWithoutAgriculturePlotConditionsInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  recordedAt: z.coerce.date().optional(),
  temperature: z.number().optional().nullable(),
  moisture: z.number().optional().nullable(),
  ph: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'ph' must be a Decimal",
}).optional().nullable(),
  notes: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutAgriculturePlotConditionsInputObjectSchema)
}).strict();
export const AgriculturePlotConditionCreateWithoutPlotInputObjectSchema: z.ZodType<Prisma.AgriculturePlotConditionCreateWithoutPlotInput> = makeSchema() as unknown as z.ZodType<Prisma.AgriculturePlotConditionCreateWithoutPlotInput>;
export const AgriculturePlotConditionCreateWithoutPlotInputObjectZodSchema = makeSchema();
