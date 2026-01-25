import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { DateTimeNullableWithAggregatesFilterObjectSchema as DateTimeNullableWithAggregatesFilterObjectSchema } from './DateTimeNullableWithAggregatesFilter.schema';
import { EnumLifecycleStatusWithAggregatesFilterObjectSchema as EnumLifecycleStatusWithAggregatesFilterObjectSchema } from './EnumLifecycleStatusWithAggregatesFilter.schema';
import { LifecycleStatusSchema } from '../enums/LifecycleStatus.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const culinarypreptaskscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => CulinaryPrepTaskScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => CulinaryPrepTaskScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => CulinaryPrepTaskScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => CulinaryPrepTaskScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => CulinaryPrepTaskScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  task: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  station: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  dueAt: z.union([z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  status: z.union([z.lazy(() => EnumLifecycleStatusWithAggregatesFilterObjectSchema), LifecycleStatusSchema]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const CulinaryPrepTaskScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.CulinaryPrepTaskScalarWhereWithAggregatesInput> = culinarypreptaskscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.CulinaryPrepTaskScalarWhereWithAggregatesInput>;
export const CulinaryPrepTaskScalarWhereWithAggregatesInputObjectZodSchema = culinarypreptaskscalarwherewithaggregatesinputSchema;
