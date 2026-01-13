import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const AssignmentTimecardOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.AssignmentTimecardOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentTimecardOrderByRelationAggregateInput>;
export const AssignmentTimecardOrderByRelationAggregateInputObjectZodSchema = makeSchema();
