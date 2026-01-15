import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const StaffingShiftOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.StaffingShiftOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingShiftOrderByRelationAggregateInput>;
export const StaffingShiftOrderByRelationAggregateInputObjectZodSchema = makeSchema();
