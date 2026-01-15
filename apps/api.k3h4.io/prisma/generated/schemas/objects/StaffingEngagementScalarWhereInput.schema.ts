import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { DecimalNullableFilterObjectSchema as DecimalNullableFilterObjectSchema } from './DecimalNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const staffingengagementscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => StaffingEngagementScalarWhereInputObjectSchema), z.lazy(() => StaffingEngagementScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => StaffingEngagementScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => StaffingEngagementScalarWhereInputObjectSchema), z.lazy(() => StaffingEngagementScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  client: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  priority: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  status: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  startDate: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  endDate: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  budget: z.union([z.lazy(() => DecimalNullableFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'budget' must be a Decimal",
})]).optional().nullable(),
  forecast: z.union([z.lazy(() => DecimalNullableFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'forecast' must be a Decimal",
})]).optional().nullable(),
  notes: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const StaffingEngagementScalarWhereInputObjectSchema: z.ZodType<Prisma.StaffingEngagementScalarWhereInput> = staffingengagementscalarwhereinputSchema as unknown as z.ZodType<Prisma.StaffingEngagementScalarWhereInput>;
export const StaffingEngagementScalarWhereInputObjectZodSchema = staffingengagementscalarwhereinputSchema;
