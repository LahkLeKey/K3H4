import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { JsonNullableFilterObjectSchema as JsonNullableFilterObjectSchema } from './JsonNullableFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { UserScalarRelationFilterObjectSchema as UserScalarRelationFilterObjectSchema } from './UserScalarRelationFilter.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { AgriculturePlotNullableScalarRelationFilterObjectSchema as AgriculturePlotNullableScalarRelationFilterObjectSchema } from './AgriculturePlotNullableScalarRelationFilter.schema';
import { AgriculturePlotWhereInputObjectSchema as AgriculturePlotWhereInputObjectSchema } from './AgriculturePlotWhereInput.schema';
import { AgricultureCropPlanNullableScalarRelationFilterObjectSchema as AgricultureCropPlanNullableScalarRelationFilterObjectSchema } from './AgricultureCropPlanNullableScalarRelationFilter.schema';
import { AgricultureCropPlanWhereInputObjectSchema as AgricultureCropPlanWhereInputObjectSchema } from './AgricultureCropPlanWhereInput.schema'

const agriculturetaskwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => AgricultureTaskWhereInputObjectSchema), z.lazy(() => AgricultureTaskWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => AgricultureTaskWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => AgricultureTaskWhereInputObjectSchema), z.lazy(() => AgricultureTaskWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  plotId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  cropPlanId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  title: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  assignee: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  priority: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  tags: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  notes: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  dueDate: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  status: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  user: z.union([z.lazy(() => UserScalarRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)]).optional(),
  plot: z.union([z.lazy(() => AgriculturePlotNullableScalarRelationFilterObjectSchema), z.lazy(() => AgriculturePlotWhereInputObjectSchema)]).optional(),
  cropPlan: z.union([z.lazy(() => AgricultureCropPlanNullableScalarRelationFilterObjectSchema), z.lazy(() => AgricultureCropPlanWhereInputObjectSchema)]).optional()
}).strict();
export const AgricultureTaskWhereInputObjectSchema: z.ZodType<Prisma.AgricultureTaskWhereInput> = agriculturetaskwhereinputSchema as unknown as z.ZodType<Prisma.AgricultureTaskWhereInput>;
export const AgricultureTaskWhereInputObjectZodSchema = agriculturetaskwhereinputSchema;
