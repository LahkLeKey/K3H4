import * as z from 'zod';
import { Prisma } from '@prisma/client';


import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  assignmentId: z.string(),
  personaId: z.string(),
  amount: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'amount' must be a Decimal",
}),
  note: z.string().optional().nullable(),
  invoiceUrl: z.string().optional().nullable(),
  status: z.string().optional(),
  createdAt: z.coerce.date().optional()
}).strict();
export const AssignmentPayoutUncheckedCreateInputObjectSchema: z.ZodType<Prisma.AssignmentPayoutUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentPayoutUncheckedCreateInput>;
export const AssignmentPayoutUncheckedCreateInputObjectZodSchema = makeSchema();
