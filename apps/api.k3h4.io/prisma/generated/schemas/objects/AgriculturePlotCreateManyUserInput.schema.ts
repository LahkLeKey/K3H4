import * as z from 'zod';
import { Prisma } from '@prisma/client';


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
  updatedAt: z.coerce.date().optional()
}).strict();
export const AgriculturePlotCreateManyUserInputObjectSchema: z.ZodType<Prisma.AgriculturePlotCreateManyUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AgriculturePlotCreateManyUserInput>;
export const AgriculturePlotCreateManyUserInputObjectZodSchema = makeSchema();
