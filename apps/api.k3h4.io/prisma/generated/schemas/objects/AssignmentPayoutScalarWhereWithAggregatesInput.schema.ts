import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { DecimalWithAggregatesFilterObjectSchema as DecimalWithAggregatesFilterObjectSchema } from './DecimalWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema as StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const assignmentpayoutscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => AssignmentPayoutScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => AssignmentPayoutScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => AssignmentPayoutScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => AssignmentPayoutScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => AssignmentPayoutScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  assignmentId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  personaId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  amount: z.union([z.lazy(() => DecimalWithAggregatesFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'amount' must be a Decimal",
})]).optional(),
  note: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  invoiceUrl: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  status: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const AssignmentPayoutScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.AssignmentPayoutScalarWhereWithAggregatesInput> = assignmentpayoutscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.AssignmentPayoutScalarWhereWithAggregatesInput>;
export const AssignmentPayoutScalarWhereWithAggregatesInputObjectZodSchema = assignmentpayoutscalarwherewithaggregatesinputSchema;
