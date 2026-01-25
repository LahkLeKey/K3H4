import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { EnumLifecycleStatusWithAggregatesFilterObjectSchema as EnumLifecycleStatusWithAggregatesFilterObjectSchema } from './EnumLifecycleStatusWithAggregatesFilter.schema';
import { LifecycleStatusSchema } from '../enums/LifecycleStatus.schema';
import { StringNullableWithAggregatesFilterObjectSchema as StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const arcademachinescalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => ArcadeMachineScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => ArcadeMachineScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ArcadeMachineScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ArcadeMachineScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => ArcadeMachineScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  gameTitle: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  status: z.union([z.lazy(() => EnumLifecycleStatusWithAggregatesFilterObjectSchema), LifecycleStatusSchema]).optional(),
  location: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const ArcadeMachineScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.ArcadeMachineScalarWhereWithAggregatesInput> = arcademachinescalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.ArcadeMachineScalarWhereWithAggregatesInput>;
export const ArcadeMachineScalarWhereWithAggregatesInputObjectZodSchema = arcademachinescalarwherewithaggregatesinputSchema;
