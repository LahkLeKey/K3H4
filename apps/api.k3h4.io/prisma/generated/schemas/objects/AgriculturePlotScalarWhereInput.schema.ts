import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DecimalFilterObjectSchema as DecimalFilterObjectSchema } from './DecimalFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const agricultureplotscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => AgriculturePlotScalarWhereInputObjectSchema), z.lazy(() => AgriculturePlotScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => AgriculturePlotScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => AgriculturePlotScalarWhereInputObjectSchema), z.lazy(() => AgriculturePlotScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  fieldCode: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  crop: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  stage: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  acres: z.union([z.lazy(() => DecimalFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'acres' must be a Decimal",
})]).optional(),
  health: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  soilType: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  irrigationZone: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  notes: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  lastConditionAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const AgriculturePlotScalarWhereInputObjectSchema: z.ZodType<Prisma.AgriculturePlotScalarWhereInput> = agricultureplotscalarwhereinputSchema as unknown as z.ZodType<Prisma.AgriculturePlotScalarWhereInput>;
export const AgriculturePlotScalarWhereInputObjectZodSchema = agricultureplotscalarwhereinputSchema;
