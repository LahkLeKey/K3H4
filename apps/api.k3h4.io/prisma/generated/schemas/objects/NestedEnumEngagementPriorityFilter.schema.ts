import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EngagementPrioritySchema } from '../enums/EngagementPriority.schema'

const nestedenumengagementpriorityfilterSchema = z.object({
  equals: EngagementPrioritySchema.optional(),
  in: EngagementPrioritySchema.array().optional(),
  notIn: EngagementPrioritySchema.array().optional(),
  not: z.union([EngagementPrioritySchema, z.lazy(() => NestedEnumEngagementPriorityFilterObjectSchema)]).optional()
}).strict();
export const NestedEnumEngagementPriorityFilterObjectSchema: z.ZodType<Prisma.NestedEnumEngagementPriorityFilter> = nestedenumengagementpriorityfilterSchema as unknown as z.ZodType<Prisma.NestedEnumEngagementPriorityFilter>;
export const NestedEnumEngagementPriorityFilterObjectZodSchema = nestedenumengagementpriorityfilterSchema;
