import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  billRate: SortOrderSchema.optional(),
  payRate: SortOrderSchema.optional(),
  margin: SortOrderSchema.optional()
}).strict();
export const StaffingPlacementAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.StaffingPlacementAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingPlacementAvgOrderByAggregateInput>;
export const StaffingPlacementAvgOrderByAggregateInputObjectZodSchema = makeSchema();
