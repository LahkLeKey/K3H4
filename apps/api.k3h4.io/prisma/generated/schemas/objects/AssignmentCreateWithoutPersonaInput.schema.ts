import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { UserCreateNestedOneWithoutAssignmentsInputObjectSchema as UserCreateNestedOneWithoutAssignmentsInputObjectSchema } from './UserCreateNestedOneWithoutAssignmentsInput.schema';
import { AssignmentTimecardCreateNestedManyWithoutAssignmentInputObjectSchema as AssignmentTimecardCreateNestedManyWithoutAssignmentInputObjectSchema } from './AssignmentTimecardCreateNestedManyWithoutAssignmentInput.schema';
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
  timecards: z.lazy(() => AssignmentTimecardCreateNestedManyWithoutAssignmentInputObjectSchema).optional(),
  payouts: z.lazy(() => AssignmentPayoutCreateNestedManyWithoutAssignmentInputObjectSchema).optional()
}).strict();
export const AssignmentCreateWithoutPersonaInputObjectSchema: z.ZodType<Prisma.AssignmentCreateWithoutPersonaInput> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentCreateWithoutPersonaInput>;
export const AssignmentCreateWithoutPersonaInputObjectZodSchema = makeSchema();
