import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { LifecycleStatusSchema } from '../enums/LifecycleStatus.schema'

const nestedenumlifecyclestatusfilterSchema = z.object({
  equals: LifecycleStatusSchema.optional(),
  in: LifecycleStatusSchema.array().optional(),
  notIn: LifecycleStatusSchema.array().optional(),
  not: z.union([LifecycleStatusSchema, z.lazy(() => NestedEnumLifecycleStatusFilterObjectSchema)]).optional()
}).strict();
export const NestedEnumLifecycleStatusFilterObjectSchema: z.ZodType<Prisma.NestedEnumLifecycleStatusFilter> = nestedenumlifecyclestatusfilterSchema as unknown as z.ZodType<Prisma.NestedEnumLifecycleStatusFilter>;
export const NestedEnumLifecycleStatusFilterObjectZodSchema = nestedenumlifecyclestatusfilterSchema;
