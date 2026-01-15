import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  score: SortOrderSchema.optional(),
  desiredRate: SortOrderSchema.optional()
}).strict();
export const StaffingCandidateSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.StaffingCandidateSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingCandidateSumOrderByAggregateInput>;
export const StaffingCandidateSumOrderByAggregateInputObjectZodSchema = makeSchema();
