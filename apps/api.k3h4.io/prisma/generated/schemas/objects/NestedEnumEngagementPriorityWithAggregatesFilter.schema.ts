import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EngagementPrioritySchema } from '../enums/EngagementPriority.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumEngagementPriorityFilterObjectSchema as NestedEnumEngagementPriorityFilterObjectSchema } from './NestedEnumEngagementPriorityFilter.schema'

const nestedenumengagementprioritywithaggregatesfilterSchema = z.object({
  equals: EngagementPrioritySchema.optional(),
  in: EngagementPrioritySchema.array().optional(),
  notIn: EngagementPrioritySchema.array().optional(),
  not: z.union([EngagementPrioritySchema, z.lazy(() => NestedEnumEngagementPriorityWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumEngagementPriorityFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumEngagementPriorityFilterObjectSchema).optional()
}).strict();
export const NestedEnumEngagementPriorityWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumEngagementPriorityWithAggregatesFilter> = nestedenumengagementprioritywithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedEnumEngagementPriorityWithAggregatesFilter>;
export const NestedEnumEngagementPriorityWithAggregatesFilterObjectZodSchema = nestedenumengagementprioritywithaggregatesfilterSchema;
