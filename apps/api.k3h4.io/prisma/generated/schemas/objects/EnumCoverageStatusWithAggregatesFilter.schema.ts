import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CoverageStatusSchema } from '../enums/CoverageStatus.schema';
import { NestedEnumCoverageStatusWithAggregatesFilterObjectSchema as NestedEnumCoverageStatusWithAggregatesFilterObjectSchema } from './NestedEnumCoverageStatusWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumCoverageStatusFilterObjectSchema as NestedEnumCoverageStatusFilterObjectSchema } from './NestedEnumCoverageStatusFilter.schema'

const makeSchema = () => z.object({
  equals: CoverageStatusSchema.optional(),
  in: CoverageStatusSchema.array().optional(),
  notIn: CoverageStatusSchema.array().optional(),
  not: z.union([CoverageStatusSchema, z.lazy(() => NestedEnumCoverageStatusWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumCoverageStatusFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumCoverageStatusFilterObjectSchema).optional()
}).strict();
export const EnumCoverageStatusWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumCoverageStatusWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumCoverageStatusWithAggregatesFilter>;
export const EnumCoverageStatusWithAggregatesFilterObjectZodSchema = makeSchema();
