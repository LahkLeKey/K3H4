import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  openings: z.literal(true).optional(),
  filled: z.literal(true).optional(),
  rateMin: z.literal(true).optional(),
  rateMax: z.literal(true).optional(),
  billRate: z.literal(true).optional(),
  payRate: z.literal(true).optional()
}).strict();
export const StaffingRoleSumAggregateInputObjectSchema: z.ZodType<Prisma.StaffingRoleSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.StaffingRoleSumAggregateInputType>;
export const StaffingRoleSumAggregateInputObjectZodSchema = makeSchema();
