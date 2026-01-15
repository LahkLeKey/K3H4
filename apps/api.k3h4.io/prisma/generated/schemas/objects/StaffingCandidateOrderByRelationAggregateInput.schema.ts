import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const StaffingCandidateOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.StaffingCandidateOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingCandidateOrderByRelationAggregateInput>;
export const StaffingCandidateOrderByRelationAggregateInputObjectZodSchema = makeSchema();
