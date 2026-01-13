import * as z from 'zod';
import { Prisma } from '@prisma/client';


import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  userId: z.string(),
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
  updatedAt: z.coerce.date().optional()
}).strict();
export const AgriculturePlotConditionCreateManyPlotInputObjectSchema: z.ZodType<Prisma.AgriculturePlotConditionCreateManyPlotInput> = makeSchema() as unknown as z.ZodType<Prisma.AgriculturePlotConditionCreateManyPlotInput>;
export const AgriculturePlotConditionCreateManyPlotInputObjectZodSchema = makeSchema();
