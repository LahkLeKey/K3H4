import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { AssignmentTimecardUncheckedCreateNestedManyWithoutAssignmentInputObjectSchema as AssignmentTimecardUncheckedCreateNestedManyWithoutAssignmentInputObjectSchema } from './AssignmentTimecardUncheckedCreateNestedManyWithoutAssignmentInput.schema';
import { AssignmentPayoutUncheckedCreateNestedManyWithoutAssignmentInputObjectSchema as AssignmentPayoutUncheckedCreateNestedManyWithoutAssignmentInputObjectSchema } from './AssignmentPayoutUncheckedCreateNestedManyWithoutAssignmentInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  userId: z.string(),
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
  timecards: z.lazy(() => AssignmentTimecardUncheckedCreateNestedManyWithoutAssignmentInputObjectSchema).optional(),
  payouts: z.lazy(() => AssignmentPayoutUncheckedCreateNestedManyWithoutAssignmentInputObjectSchema).optional()
}).strict();
export const AssignmentUncheckedCreateInputObjectSchema: z.ZodType<Prisma.AssignmentUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentUncheckedCreateInput>;
export const AssignmentUncheckedCreateInputObjectZodSchema = makeSchema();
