import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { FloatNullableFilterObjectSchema as FloatNullableFilterObjectSchema } from './FloatNullableFilter.schema';
import { DecimalNullableFilterObjectSchema as DecimalNullableFilterObjectSchema } from './DecimalNullableFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { UserScalarRelationFilterObjectSchema as UserScalarRelationFilterObjectSchema } from './UserScalarRelationFilter.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { AgriculturePlotScalarRelationFilterObjectSchema as AgriculturePlotScalarRelationFilterObjectSchema } from './AgriculturePlotScalarRelationFilter.schema';
import { AgriculturePlotWhereInputObjectSchema as AgriculturePlotWhereInputObjectSchema } from './AgriculturePlotWhereInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const agricultureplotconditionwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => AgriculturePlotConditionWhereInputObjectSchema), z.lazy(() => AgriculturePlotConditionWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => AgriculturePlotConditionWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => AgriculturePlotConditionWhereInputObjectSchema), z.lazy(() => AgriculturePlotConditionWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  plotId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  recordedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  temperature: z.union([z.lazy(() => FloatNullableFilterObjectSchema), z.number()]).optional().nullable(),
  moisture: z.union([z.lazy(() => FloatNullableFilterObjectSchema), z.number()]).optional().nullable(),
  ph: z.union([z.lazy(() => DecimalNullableFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'ph' must be a Decimal",
})]).optional().nullable(),
  notes: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  user: z.union([z.lazy(() => UserScalarRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)]).optional(),
  plot: z.union([z.lazy(() => AgriculturePlotScalarRelationFilterObjectSchema), z.lazy(() => AgriculturePlotWhereInputObjectSchema)]).optional()
}).strict();
export const AgriculturePlotConditionWhereInputObjectSchema: z.ZodType<Prisma.AgriculturePlotConditionWhereInput> = agricultureplotconditionwhereinputSchema as unknown as z.ZodType<Prisma.AgriculturePlotConditionWhereInput>;
export const AgriculturePlotConditionWhereInputObjectZodSchema = agricultureplotconditionwhereinputSchema;
