import * as z from 'zod';
import { Prisma } from '@prisma/client';


import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  userId: z.string(),
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
export const AssignmentCreateManyPersonaInputObjectSchema: z.ZodType<Prisma.AssignmentCreateManyPersonaInput> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentCreateManyPersonaInput>;
export const AssignmentCreateManyPersonaInputObjectZodSchema = makeSchema();
