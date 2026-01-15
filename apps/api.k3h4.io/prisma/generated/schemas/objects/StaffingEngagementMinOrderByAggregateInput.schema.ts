import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  client: SortOrderSchema.optional(),
  priority: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  startDate: SortOrderSchema.optional(),
  endDate: SortOrderSchema.optional(),
  budget: SortOrderSchema.optional(),
  forecast: SortOrderSchema.optional(),
  notes: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const StaffingEngagementMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.StaffingEngagementMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingEngagementMinOrderByAggregateInput>;
export const StaffingEngagementMinOrderByAggregateInputObjectZodSchema = makeSchema();
