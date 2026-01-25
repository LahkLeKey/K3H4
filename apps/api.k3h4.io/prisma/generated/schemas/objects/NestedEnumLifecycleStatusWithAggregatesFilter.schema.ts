import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { LifecycleStatusSchema } from '../enums/LifecycleStatus.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumLifecycleStatusFilterObjectSchema as NestedEnumLifecycleStatusFilterObjectSchema } from './NestedEnumLifecycleStatusFilter.schema'

const nestedenumlifecyclestatuswithaggregatesfilterSchema = z.object({
  equals: LifecycleStatusSchema.optional(),
  in: LifecycleStatusSchema.array().optional(),
  notIn: LifecycleStatusSchema.array().optional(),
  not: z.union([LifecycleStatusSchema, z.lazy(() => NestedEnumLifecycleStatusWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumLifecycleStatusFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumLifecycleStatusFilterObjectSchema).optional()
}).strict();
export const NestedEnumLifecycleStatusWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumLifecycleStatusWithAggregatesFilter> = nestedenumlifecyclestatuswithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedEnumLifecycleStatusWithAggregatesFilter>;
export const NestedEnumLifecycleStatusWithAggregatesFilterObjectZodSchema = nestedenumlifecyclestatuswithaggregatesfilterSchema;
