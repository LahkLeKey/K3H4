import * as z from 'zod';
import { Prisma } from '@prisma/client';


import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  personaId: z.string(),
  title: z.string(),
  hourlyRate: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'hourlyRate' must be a Decimal",
}),
  status: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const AssignmentCreateManyUserInputObjectSchema: z.ZodType<Prisma.AssignmentCreateManyUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentCreateManyUserInput>;
export const AssignmentCreateManyUserInputObjectZodSchema = makeSchema();
