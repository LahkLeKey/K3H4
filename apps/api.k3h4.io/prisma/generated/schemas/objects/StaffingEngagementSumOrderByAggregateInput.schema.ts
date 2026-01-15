import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  budget: SortOrderSchema.optional(),
  forecast: SortOrderSchema.optional()
}).strict();
export const StaffingEngagementSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.StaffingEngagementSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingEngagementSumOrderByAggregateInput>;
export const StaffingEngagementSumOrderByAggregateInputObjectZodSchema = makeSchema();
