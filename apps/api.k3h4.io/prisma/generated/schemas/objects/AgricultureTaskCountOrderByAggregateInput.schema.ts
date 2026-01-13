import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  plotId: SortOrderSchema.optional(),
  cropPlanId: SortOrderSchema.optional(),
  title: SortOrderSchema.optional(),
  assignee: SortOrderSchema.optional(),
  priority: SortOrderSchema.optional(),
  tags: SortOrderSchema.optional(),
  notes: SortOrderSchema.optional(),
  dueDate: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const AgricultureTaskCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.AgricultureTaskCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureTaskCountOrderByAggregateInput>;
export const AgricultureTaskCountOrderByAggregateInputObjectZodSchema = makeSchema();
