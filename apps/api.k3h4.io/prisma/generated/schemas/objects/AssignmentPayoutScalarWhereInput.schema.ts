import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { DecimalFilterObjectSchema as DecimalFilterObjectSchema } from './DecimalFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const assignmentpayoutscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => AssignmentPayoutScalarWhereInputObjectSchema), z.lazy(() => AssignmentPayoutScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => AssignmentPayoutScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => AssignmentPayoutScalarWhereInputObjectSchema), z.lazy(() => AssignmentPayoutScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  assignmentId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  personaId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  amount: z.union([z.lazy(() => DecimalFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'amount' must be a Decimal",
})]).optional(),
  note: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  invoiceUrl: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  status: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const AssignmentPayoutScalarWhereInputObjectSchema: z.ZodType<Prisma.AssignmentPayoutScalarWhereInput> = assignmentpayoutscalarwhereinputSchema as unknown as z.ZodType<Prisma.AssignmentPayoutScalarWhereInput>;
export const AssignmentPayoutScalarWhereInputObjectZodSchema = assignmentpayoutscalarwhereinputSchema;
