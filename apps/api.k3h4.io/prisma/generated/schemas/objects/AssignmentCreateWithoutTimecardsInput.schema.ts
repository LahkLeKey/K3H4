import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { UserCreateNestedOneWithoutAssignmentsInputObjectSchema as UserCreateNestedOneWithoutAssignmentsInputObjectSchema } from './UserCreateNestedOneWithoutAssignmentsInput.schema';
import { PersonaCreateNestedOneWithoutAssignmentsInputObjectSchema as PersonaCreateNestedOneWithoutAssignmentsInputObjectSchema } from './PersonaCreateNestedOneWithoutAssignmentsInput.schema';
import { AssignmentPayoutCreateNestedManyWithoutAssignmentInputObjectSchema as AssignmentPayoutCreateNestedManyWithoutAssignmentInputObjectSchema } from './AssignmentPayoutCreateNestedManyWithoutAssignmentInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
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
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutAssignmentsInputObjectSchema),
  persona: z.lazy(() => PersonaCreateNestedOneWithoutAssignmentsInputObjectSchema),
  payouts: z.lazy(() => AssignmentPayoutCreateNestedManyWithoutAssignmentInputObjectSchema).optional()
}).strict();
export const AssignmentCreateWithoutTimecardsInputObjectSchema: z.ZodType<Prisma.AssignmentCreateWithoutTimecardsInput> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentCreateWithoutTimecardsInput>;
export const AssignmentCreateWithoutTimecardsInputObjectZodSchema = makeSchema();
