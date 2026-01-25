import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CoverageStatusSchema } from '../enums/CoverageStatus.schema'

const nestedenumcoveragestatusfilterSchema = z.object({
  equals: CoverageStatusSchema.optional(),
  in: CoverageStatusSchema.array().optional(),
  notIn: CoverageStatusSchema.array().optional(),
  not: z.union([CoverageStatusSchema, z.lazy(() => NestedEnumCoverageStatusFilterObjectSchema)]).optional()
}).strict();
export const NestedEnumCoverageStatusFilterObjectSchema: z.ZodType<Prisma.NestedEnumCoverageStatusFilter> = nestedenumcoveragestatusfilterSchema as unknown as z.ZodType<Prisma.NestedEnumCoverageStatusFilter>;
export const NestedEnumCoverageStatusFilterObjectZodSchema = nestedenumcoveragestatusfilterSchema;
