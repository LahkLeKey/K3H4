import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CoverageStatusSchema } from '../enums/CoverageStatus.schema';
import { NestedEnumCoverageStatusFilterObjectSchema as NestedEnumCoverageStatusFilterObjectSchema } from './NestedEnumCoverageStatusFilter.schema'

const makeSchema = () => z.object({
  equals: CoverageStatusSchema.optional(),
  in: CoverageStatusSchema.array().optional(),
  notIn: CoverageStatusSchema.array().optional(),
  not: z.union([CoverageStatusSchema, z.lazy(() => NestedEnumCoverageStatusFilterObjectSchema)]).optional()
}).strict();
export const EnumCoverageStatusFilterObjectSchema: z.ZodType<Prisma.EnumCoverageStatusFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumCoverageStatusFilter>;
export const EnumCoverageStatusFilterObjectZodSchema = makeSchema();
