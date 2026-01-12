import * as z from 'zod';
import { Prisma } from '@prisma/client';


import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  hours: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'hours' must be a Decimal",
}),
  amount: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'amount' must be a Decimal",
}),
  note: z.string().optional().nullable(),
  status: z.string().optional(),
  createdAt: z.coerce.date().optional()
}).strict();
export const AssignmentTimecardCreateWithoutAssignmentInputObjectSchema: z.ZodType<Prisma.AssignmentTimecardCreateWithoutAssignmentInput> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentTimecardCreateWithoutAssignmentInput>;
export const AssignmentTimecardCreateWithoutAssignmentInputObjectZodSchema = makeSchema();
