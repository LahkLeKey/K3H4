import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  openings: SortOrderSchema.optional(),
  filled: SortOrderSchema.optional(),
  rateMin: SortOrderSchema.optional(),
  rateMax: SortOrderSchema.optional(),
  billRate: SortOrderSchema.optional(),
  payRate: SortOrderSchema.optional()
}).strict();
export const StaffingRoleAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.StaffingRoleAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingRoleAvgOrderByAggregateInput>;
export const StaffingRoleAvgOrderByAggregateInputObjectZodSchema = makeSchema();
