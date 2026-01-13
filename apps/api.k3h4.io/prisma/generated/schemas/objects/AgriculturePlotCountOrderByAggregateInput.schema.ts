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
export const AgriculturePlotCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.AgriculturePlotCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.AgriculturePlotCountOrderByAggregateInput>;
export const AgriculturePlotCountOrderByAggregateInputObjectZodSchema = makeSchema();
