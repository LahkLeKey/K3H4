import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { EnumLifecycleStatusFilterObjectSchema as EnumLifecycleStatusFilterObjectSchema } from './EnumLifecycleStatusFilter.schema';
import { LifecycleStatusSchema } from '../enums/LifecycleStatus.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const arcademachinescalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => ArcadeMachineScalarWhereInputObjectSchema), z.lazy(() => ArcadeMachineScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ArcadeMachineScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ArcadeMachineScalarWhereInputObjectSchema), z.lazy(() => ArcadeMachineScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  gameTitle: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  status: z.union([z.lazy(() => EnumLifecycleStatusFilterObjectSchema), LifecycleStatusSchema]).optional(),
  location: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const ArcadeMachineScalarWhereInputObjectSchema: z.ZodType<Prisma.ArcadeMachineScalarWhereInput> = arcademachinescalarwhereinputSchema as unknown as z.ZodType<Prisma.ArcadeMachineScalarWhereInput>;
export const ArcadeMachineScalarWhereInputObjectZodSchema = arcademachinescalarwhereinputSchema;
