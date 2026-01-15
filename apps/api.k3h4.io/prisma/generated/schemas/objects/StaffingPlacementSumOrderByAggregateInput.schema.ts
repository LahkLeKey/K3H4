import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  billRate: SortOrderSchema.optional(),
  payRate: SortOrderSchema.optional(),
  margin: SortOrderSchema.optional()
}).strict();
export const StaffingPlacementSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.StaffingPlacementSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingPlacementSumOrderByAggregateInput>;
export const StaffingPlacementSumOrderByAggregateInputObjectZodSchema = makeSchema();
