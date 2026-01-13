import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DecimalFilterObjectSchema as DecimalFilterObjectSchema } from './DecimalFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { UserScalarRelationFilterObjectSchema as UserScalarRelationFilterObjectSchema } from './UserScalarRelationFilter.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { AgricultureCropPlanListRelationFilterObjectSchema as AgricultureCropPlanListRelationFilterObjectSchema } from './AgricultureCropPlanListRelationFilter.schema';
import { AgriculturePlotConditionListRelationFilterObjectSchema as AgriculturePlotConditionListRelationFilterObjectSchema } from './AgriculturePlotConditionListRelationFilter.schema';
import { AgricultureTaskListRelationFilterObjectSchema as AgricultureTaskListRelationFilterObjectSchema } from './AgricultureTaskListRelationFilter.schema';
import { AgricultureSlotListRelationFilterObjectSchema as AgricultureSlotListRelationFilterObjectSchema } from './AgricultureSlotListRelationFilter.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const agricultureplotwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => AgriculturePlotWhereInputObjectSchema), z.lazy(() => AgriculturePlotWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => AgriculturePlotWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => AgriculturePlotWhereInputObjectSchema), z.lazy(() => AgriculturePlotWhereInputObjectSchema).array()]).optional(),
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
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  user: z.union([z.lazy(() => UserScalarRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)]).optional(),
  cropPlans: z.lazy(() => AgricultureCropPlanListRelationFilterObjectSchema).optional(),
  conditions: z.lazy(() => AgriculturePlotConditionListRelationFilterObjectSchema).optional(),
  tasks: z.lazy(() => AgricultureTaskListRelationFilterObjectSchema).optional(),
  slots: z.lazy(() => AgricultureSlotListRelationFilterObjectSchema).optional()
}).strict();
export const AgriculturePlotWhereInputObjectSchema: z.ZodType<Prisma.AgriculturePlotWhereInput> = agricultureplotwhereinputSchema as unknown as z.ZodType<Prisma.AgriculturePlotWhereInput>;
export const AgriculturePlotWhereInputObjectZodSchema = agricultureplotwhereinputSchema;
