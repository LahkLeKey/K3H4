import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { EnumLifecycleStatusFilterObjectSchema as EnumLifecycleStatusFilterObjectSchema } from './EnumLifecycleStatusFilter.schema';
import { LifecycleStatusSchema } from '../enums/LifecycleStatus.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const culinarypreptaskscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => CulinaryPrepTaskScalarWhereInputObjectSchema), z.lazy(() => CulinaryPrepTaskScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => CulinaryPrepTaskScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => CulinaryPrepTaskScalarWhereInputObjectSchema), z.lazy(() => CulinaryPrepTaskScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  task: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  station: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  dueAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  status: z.union([z.lazy(() => EnumLifecycleStatusFilterObjectSchema), LifecycleStatusSchema]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const CulinaryPrepTaskScalarWhereInputObjectSchema: z.ZodType<Prisma.CulinaryPrepTaskScalarWhereInput> = culinarypreptaskscalarwhereinputSchema as unknown as z.ZodType<Prisma.CulinaryPrepTaskScalarWhereInput>;
export const CulinaryPrepTaskScalarWhereInputObjectZodSchema = culinarypreptaskscalarwhereinputSchema;
