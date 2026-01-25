import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { LifecycleStatusSchema } from '../enums/LifecycleStatus.schema';
import { NestedEnumLifecycleStatusFilterObjectSchema as NestedEnumLifecycleStatusFilterObjectSchema } from './NestedEnumLifecycleStatusFilter.schema'

const makeSchema = () => z.object({
  equals: LifecycleStatusSchema.optional(),
  in: LifecycleStatusSchema.array().optional(),
  notIn: LifecycleStatusSchema.array().optional(),
  not: z.union([LifecycleStatusSchema, z.lazy(() => NestedEnumLifecycleStatusFilterObjectSchema)]).optional()
}).strict();
export const EnumLifecycleStatusFilterObjectSchema: z.ZodType<Prisma.EnumLifecycleStatusFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumLifecycleStatusFilter>;
export const EnumLifecycleStatusFilterObjectZodSchema = makeSchema();
