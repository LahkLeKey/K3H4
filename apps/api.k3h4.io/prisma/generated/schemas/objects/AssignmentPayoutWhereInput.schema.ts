import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { DecimalFilterObjectSchema as DecimalFilterObjectSchema } from './DecimalFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { AssignmentScalarRelationFilterObjectSchema as AssignmentScalarRelationFilterObjectSchema } from './AssignmentScalarRelationFilter.schema';
import { AssignmentWhereInputObjectSchema as AssignmentWhereInputObjectSchema } from './AssignmentWhereInput.schema';
import { PersonaScalarRelationFilterObjectSchema as PersonaScalarRelationFilterObjectSchema } from './PersonaScalarRelationFilter.schema';
import { PersonaWhereInputObjectSchema as PersonaWhereInputObjectSchema } from './PersonaWhereInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const assignmentpayoutwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => AssignmentPayoutWhereInputObjectSchema), z.lazy(() => AssignmentPayoutWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => AssignmentPayoutWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => AssignmentPayoutWhereInputObjectSchema), z.lazy(() => AssignmentPayoutWhereInputObjectSchema).array()]).optional(),
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
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  assignment: z.union([z.lazy(() => AssignmentScalarRelationFilterObjectSchema), z.lazy(() => AssignmentWhereInputObjectSchema)]).optional(),
  persona: z.union([z.lazy(() => PersonaScalarRelationFilterObjectSchema), z.lazy(() => PersonaWhereInputObjectSchema)]).optional()
}).strict();
export const AssignmentPayoutWhereInputObjectSchema: z.ZodType<Prisma.AssignmentPayoutWhereInput> = assignmentpayoutwhereinputSchema as unknown as z.ZodType<Prisma.AssignmentPayoutWhereInput>;
export const AssignmentPayoutWhereInputObjectZodSchema = assignmentpayoutwhereinputSchema;
