import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { LifecycleStatusSchema } from '../enums/LifecycleStatus.schema';
import { NestedEnumLifecycleStatusWithAggregatesFilterObjectSchema as NestedEnumLifecycleStatusWithAggregatesFilterObjectSchema } from './NestedEnumLifecycleStatusWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumLifecycleStatusFilterObjectSchema as NestedEnumLifecycleStatusFilterObjectSchema } from './NestedEnumLifecycleStatusFilter.schema'

const makeSchema = () => z.object({
  equals: LifecycleStatusSchema.optional(),
  in: LifecycleStatusSchema.array().optional(),
  notIn: LifecycleStatusSchema.array().optional(),
  not: z.union([LifecycleStatusSchema, z.lazy(() => NestedEnumLifecycleStatusWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumLifecycleStatusFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumLifecycleStatusFilterObjectSchema).optional()
}).strict();
export const EnumLifecycleStatusWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumLifecycleStatusWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumLifecycleStatusWithAggregatesFilter>;
export const EnumLifecycleStatusWithAggregatesFilterObjectZodSchema = makeSchema();
