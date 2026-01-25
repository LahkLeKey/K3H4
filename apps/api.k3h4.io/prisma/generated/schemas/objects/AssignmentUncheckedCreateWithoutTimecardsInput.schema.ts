import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { LifecycleStatusSchema } from '../enums/LifecycleStatus.schema';
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
  status: LifecycleStatusSchema.optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  payouts: z.lazy(() => AssignmentPayoutUncheckedCreateNestedManyWithoutAssignmentInputObjectSchema).optional()
}).strict();
export const AssignmentUncheckedCreateWithoutTimecardsInputObjectSchema: z.ZodType<Prisma.AssignmentUncheckedCreateWithoutTimecardsInput> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentUncheckedCreateWithoutTimecardsInput>;
export const AssignmentUncheckedCreateWithoutTimecardsInputObjectZodSchema = makeSchema();
