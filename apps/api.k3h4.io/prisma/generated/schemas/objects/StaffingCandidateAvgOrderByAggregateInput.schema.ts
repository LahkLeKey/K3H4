import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  score: SortOrderSchema.optional(),
  desiredRate: SortOrderSchema.optional()
}).strict();
export const StaffingCandidateAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.StaffingCandidateAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingCandidateAvgOrderByAggregateInput>;
export const StaffingCandidateAvgOrderByAggregateInputObjectZodSchema = makeSchema();
