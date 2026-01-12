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
  notes: SortOrderSchema.optional(),
  dueDate: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const AgricultureTaskMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.AgricultureTaskMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureTaskMinOrderByAggregateInput>;
export const AgricultureTaskMinOrderByAggregateInputObjectZodSchema = makeSchema();
