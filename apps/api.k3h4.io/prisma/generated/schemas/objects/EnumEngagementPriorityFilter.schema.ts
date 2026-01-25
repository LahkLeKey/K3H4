import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EngagementPrioritySchema } from '../enums/EngagementPriority.schema';
import { NestedEnumEngagementPriorityFilterObjectSchema as NestedEnumEngagementPriorityFilterObjectSchema } from './NestedEnumEngagementPriorityFilter.schema'

const makeSchema = () => z.object({
  equals: EngagementPrioritySchema.optional(),
  in: EngagementPrioritySchema.array().optional(),
  notIn: EngagementPrioritySchema.array().optional(),
  not: z.union([EngagementPrioritySchema, z.lazy(() => NestedEnumEngagementPriorityFilterObjectSchema)]).optional()
}).strict();
export const EnumEngagementPriorityFilterObjectSchema: z.ZodType<Prisma.EnumEngagementPriorityFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumEngagementPriorityFilter>;
export const EnumEngagementPriorityFilterObjectZodSchema = makeSchema();
