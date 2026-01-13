import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { DecimalFilterObjectSchema as DecimalFilterObjectSchema } from './DecimalFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const assignmentscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => AssignmentScalarWhereInputObjectSchema), z.lazy(() => AssignmentScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => AssignmentScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => AssignmentScalarWhereInputObjectSchema), z.lazy(() => AssignmentScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  personaId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  title: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  hourlyRate: z.union([z.lazy(() => DecimalFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'hourlyRate' must be a Decimal",
})]).optional(),
  status: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const AssignmentScalarWhereInputObjectSchema: z.ZodType<Prisma.AssignmentScalarWhereInput> = assignmentscalarwhereinputSchema as unknown as z.ZodType<Prisma.AssignmentScalarWhereInput>;
export const AssignmentScalarWhereInputObjectZodSchema = assignmentscalarwhereinputSchema;
