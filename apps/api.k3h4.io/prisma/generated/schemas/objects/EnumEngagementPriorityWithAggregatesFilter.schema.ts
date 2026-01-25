import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EngagementPrioritySchema } from '../enums/EngagementPriority.schema';
import { NestedEnumEngagementPriorityWithAggregatesFilterObjectSchema as NestedEnumEngagementPriorityWithAggregatesFilterObjectSchema } from './NestedEnumEngagementPriorityWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumEngagementPriorityFilterObjectSchema as NestedEnumEngagementPriorityFilterObjectSchema } from './NestedEnumEngagementPriorityFilter.schema'

const makeSchema = () => z.object({
  equals: EngagementPrioritySchema.optional(),
  in: EngagementPrioritySchema.array().optional(),
  notIn: EngagementPrioritySchema.array().optional(),
  not: z.union([EngagementPrioritySchema, z.lazy(() => NestedEnumEngagementPriorityWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumEngagementPriorityFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumEngagementPriorityFilterObjectSchema).optional()
}).strict();
export const EnumEngagementPriorityWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumEngagementPriorityWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumEngagementPriorityWithAggregatesFilter>;
export const EnumEngagementPriorityWithAggregatesFilterObjectZodSchema = makeSchema();
