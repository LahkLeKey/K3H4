import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { UserCreateNestedOneWithoutAssignmentsInputObjectSchema as UserCreateNestedOneWithoutAssignmentsInputObjectSchema } from './UserCreateNestedOneWithoutAssignmentsInput.schema';
import { PersonaCreateNestedOneWithoutAssignmentsInputObjectSchema as PersonaCreateNestedOneWithoutAssignmentsInputObjectSchema } from './PersonaCreateNestedOneWithoutAssignmentsInput.schema';
import { AssignmentTimecardCreateNestedManyWithoutAssignmentInputObjectSchema as AssignmentTimecardCreateNestedManyWithoutAssignmentInputObjectSchema } from './AssignmentTimecardCreateNestedManyWithoutAssignmentInput.schema'

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
  timecards: z.lazy(() => AssignmentTimecardCreateNestedManyWithoutAssignmentInputObjectSchema).optional()
}).strict();
export const AssignmentCreateWithoutPayoutsInputObjectSchema: z.ZodType<Prisma.AssignmentCreateWithoutPayoutsInput> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentCreateWithoutPayoutsInput>;
export const AssignmentCreateWithoutPayoutsInputObjectZodSchema = makeSchema();
