import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { EnumLifecycleStatusFilterObjectSchema as EnumLifecycleStatusFilterObjectSchema } from './EnumLifecycleStatusFilter.schema';
import { LifecycleStatusSchema } from '../enums/LifecycleStatus.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema'

const agriculturecropplanscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => AgricultureCropPlanScalarWhereInputObjectSchema), z.lazy(() => AgricultureCropPlanScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => AgricultureCropPlanScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => AgricultureCropPlanScalarWhereInputObjectSchema), z.lazy(() => AgricultureCropPlanScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  plotId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  crop: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  phase: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  status: z.union([z.lazy(() => EnumLifecycleStatusFilterObjectSchema), LifecycleStatusSchema]).optional(),
  startDate: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  targetHarvestDate: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  endDate: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  notes: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const AgricultureCropPlanScalarWhereInputObjectSchema: z.ZodType<Prisma.AgricultureCropPlanScalarWhereInput> = agriculturecropplanscalarwhereinputSchema as unknown as z.ZodType<Prisma.AgricultureCropPlanScalarWhereInput>;
export const AgricultureCropPlanScalarWhereInputObjectZodSchema = agriculturecropplanscalarwhereinputSchema;
