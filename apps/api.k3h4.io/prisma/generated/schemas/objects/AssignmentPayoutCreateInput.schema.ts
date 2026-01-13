import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { AssignmentCreateNestedOneWithoutPayoutsInputObjectSchema as AssignmentCreateNestedOneWithoutPayoutsInputObjectSchema } from './AssignmentCreateNestedOneWithoutPayoutsInput.schema';
import { PersonaCreateNestedOneWithoutAssignmentPayoutsInputObjectSchema as PersonaCreateNestedOneWithoutAssignmentPayoutsInputObjectSchema } from './PersonaCreateNestedOneWithoutAssignmentPayoutsInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
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
  createdAt: z.coerce.date().optional(),
  assignment: z.lazy(() => AssignmentCreateNestedOneWithoutPayoutsInputObjectSchema),
  persona: z.lazy(() => PersonaCreateNestedOneWithoutAssignmentPayoutsInputObjectSchema)
}).strict();
export const AssignmentPayoutCreateInputObjectSchema: z.ZodType<Prisma.AssignmentPayoutCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentPayoutCreateInput>;
export const AssignmentPayoutCreateInputObjectZodSchema = makeSchema();
