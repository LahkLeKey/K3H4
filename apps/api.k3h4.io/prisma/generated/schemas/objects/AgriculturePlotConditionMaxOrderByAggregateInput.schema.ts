import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  plotId: SortOrderSchema.optional(),
  recordedAt: SortOrderSchema.optional(),
  temperature: SortOrderSchema.optional(),
  moisture: SortOrderSchema.optional(),
  ph: SortOrderSchema.optional(),
  notes: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const AgriculturePlotConditionMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.AgriculturePlotConditionMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.AgriculturePlotConditionMaxOrderByAggregateInput>;
export const AgriculturePlotConditionMaxOrderByAggregateInputObjectZodSchema = makeSchema();
