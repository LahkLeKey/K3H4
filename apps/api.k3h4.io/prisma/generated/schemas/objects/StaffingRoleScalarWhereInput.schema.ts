import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { DecimalNullableFilterObjectSchema as DecimalNullableFilterObjectSchema } from './DecimalNullableFilter.schema';
import { JsonNullableFilterObjectSchema as JsonNullableFilterObjectSchema } from './JsonNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const staffingrolescalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => StaffingRoleScalarWhereInputObjectSchema), z.lazy(() => StaffingRoleScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => StaffingRoleScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => StaffingRoleScalarWhereInputObjectSchema), z.lazy(() => StaffingRoleScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  engagementId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  title: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  location: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  modality: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  openings: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  filled: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  priority: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  status: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  rateMin: z.union([z.lazy(() => DecimalNullableFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'rateMin' must be a Decimal",
})]).optional().nullable(),
  rateMax: z.union([z.lazy(() => DecimalNullableFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'rateMax' must be a Decimal",
})]).optional().nullable(),
  billRate: z.union([z.lazy(() => DecimalNullableFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'billRate' must be a Decimal",
})]).optional().nullable(),
  payRate: z.union([z.lazy(() => DecimalNullableFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'payRate' must be a Decimal",
})]).optional().nullable(),
  tags: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  skills: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const StaffingRoleScalarWhereInputObjectSchema: z.ZodType<Prisma.StaffingRoleScalarWhereInput> = staffingrolescalarwhereinputSchema as unknown as z.ZodType<Prisma.StaffingRoleScalarWhereInput>;
export const StaffingRoleScalarWhereInputObjectZodSchema = staffingrolescalarwhereinputSchema;
