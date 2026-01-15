import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  billRate: z.literal(true).optional(),
  payRate: z.literal(true).optional(),
  margin: z.literal(true).optional()
}).strict();
export const StaffingPlacementSumAggregateInputObjectSchema: z.ZodType<Prisma.StaffingPlacementSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.StaffingPlacementSumAggregateInputType>;
export const StaffingPlacementSumAggregateInputObjectZodSchema = makeSchema();
