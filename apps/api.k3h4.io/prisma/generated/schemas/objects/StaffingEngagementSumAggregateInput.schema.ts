import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  budget: z.literal(true).optional(),
  forecast: z.literal(true).optional()
}).strict();
export const StaffingEngagementSumAggregateInputObjectSchema: z.ZodType<Prisma.StaffingEngagementSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.StaffingEngagementSumAggregateInputType>;
export const StaffingEngagementSumAggregateInputObjectZodSchema = makeSchema();
