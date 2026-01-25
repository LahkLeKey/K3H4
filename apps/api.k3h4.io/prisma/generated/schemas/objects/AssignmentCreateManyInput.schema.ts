import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { LifecycleStatusSchema } from '../enums/LifecycleStatus.schema'

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
  updatedAt: z.coerce.date().optional()
}).strict();
export const AssignmentCreateManyInputObjectSchema: z.ZodType<Prisma.AssignmentCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentCreateManyInput>;
export const AssignmentCreateManyInputObjectZodSchema = makeSchema();
