import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  fieldCode: SortOrderSchema.optional(),
  crop: SortOrderSchema.optional(),
  stage: SortOrderSchema.optional(),
  acres: SortOrderSchema.optional(),
  health: SortOrderSchema.optional(),
  soilType: SortOrderSchema.optional(),
  irrigationZone: SortOrderSchema.optional(),
  notes: SortOrderSchema.optional(),
  lastConditionAt: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const AgriculturePlotMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.AgriculturePlotMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.AgriculturePlotMaxOrderByAggregateInput>;
export const AgriculturePlotMaxOrderByAggregateInputObjectZodSchema = makeSchema();
