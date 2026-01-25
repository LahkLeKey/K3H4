import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { LifecycleStatusSchema } from '../enums/LifecycleStatus.schema';
import { UserCreateNestedOneWithoutAssignmentsInputObjectSchema as UserCreateNestedOneWithoutAssignmentsInputObjectSchema } from './UserCreateNestedOneWithoutAssignmentsInput.schema';
import { PersonaCreateNestedOneWithoutAssignmentsInputObjectSchema as PersonaCreateNestedOneWithoutAssignmentsInputObjectSchema } from './PersonaCreateNestedOneWithoutAssignmentsInput.schema';
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
  status: LifecycleStatusSchema.optional(),
  createdAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutAssignmentsInputObjectSchema),
  persona: z.lazy(() => PersonaCreateNestedOneWithoutAssignmentsInputObjectSchema),
  timecards: z.lazy(() => AssignmentTimecardCreateNestedManyWithoutAssignmentInputObjectSchema).optional(),
  payouts: z.lazy(() => AssignmentPayoutCreateNestedManyWithoutAssignmentInputObjectSchema).optional()
}).strict();
export const AssignmentCreateInputObjectSchema: z.ZodType<Prisma.AssignmentCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentCreateInput>;
export const AssignmentCreateInputObjectZodSchema = makeSchema();
