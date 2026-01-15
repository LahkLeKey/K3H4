import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  budget: z.literal(true).optional(),
  forecast: z.literal(true).optional()
}).strict();
export const StaffingEngagementAvgAggregateInputObjectSchema: z.ZodType<Prisma.StaffingEngagementAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.StaffingEngagementAvgAggregateInputType>;
export const StaffingEngagementAvgAggregateInputObjectZodSchema = makeSchema();
