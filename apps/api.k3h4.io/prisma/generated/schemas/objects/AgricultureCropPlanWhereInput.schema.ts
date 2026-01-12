import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { UserScalarRelationFilterObjectSchema as UserScalarRelationFilterObjectSchema } from './UserScalarRelationFilter.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { AgriculturePlotScalarRelationFilterObjectSchema as AgriculturePlotScalarRelationFilterObjectSchema } from './AgriculturePlotScalarRelationFilter.schema';
import { AgriculturePlotWhereInputObjectSchema as AgriculturePlotWhereInputObjectSchema } from './AgriculturePlotWhereInput.schema';
import { AgricultureTaskListRelationFilterObjectSchema as AgricultureTaskListRelationFilterObjectSchema } from './AgricultureTaskListRelationFilter.schema'

const agriculturecropplanwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => AgricultureCropPlanWhereInputObjectSchema), z.lazy(() => AgricultureCropPlanWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => AgricultureCropPlanWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => AgricultureCropPlanWhereInputObjectSchema), z.lazy(() => AgricultureCropPlanWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  plotId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  crop: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  phase: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  status: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  startDate: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  targetHarvestDate: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  endDate: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  notes: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  user: z.union([z.lazy(() => UserScalarRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)]).optional(),
  plot: z.union([z.lazy(() => AgriculturePlotScalarRelationFilterObjectSchema), z.lazy(() => AgriculturePlotWhereInputObjectSchema)]).optional(),
  tasks: z.lazy(() => AgricultureTaskListRelationFilterObjectSchema).optional()
}).strict();
export const AgricultureCropPlanWhereInputObjectSchema: z.ZodType<Prisma.AgricultureCropPlanWhereInput> = agriculturecropplanwhereinputSchema as unknown as z.ZodType<Prisma.AgricultureCropPlanWhereInput>;
export const AgricultureCropPlanWhereInputObjectZodSchema = agriculturecropplanwhereinputSchema;
