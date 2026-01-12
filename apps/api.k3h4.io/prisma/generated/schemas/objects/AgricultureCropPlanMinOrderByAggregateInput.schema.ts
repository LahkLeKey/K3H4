import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  plotId: SortOrderSchema.optional(),
  crop: SortOrderSchema.optional(),
  phase: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  startDate: SortOrderSchema.optional(),
  targetHarvestDate: SortOrderSchema.optional(),
  endDate: SortOrderSchema.optional(),
  notes: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const AgricultureCropPlanMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.AgricultureCropPlanMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureCropPlanMinOrderByAggregateInput>;
export const AgricultureCropPlanMinOrderByAggregateInputObjectZodSchema = makeSchema();
