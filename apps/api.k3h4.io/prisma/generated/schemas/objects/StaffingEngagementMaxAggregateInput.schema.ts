import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  name: z.literal(true).optional(),
  client: z.literal(true).optional(),
  priority: z.literal(true).optional(),
  status: z.literal(true).optional(),
  startDate: z.literal(true).optional(),
  endDate: z.literal(true).optional(),
  budget: z.literal(true).optional(),
  forecast: z.literal(true).optional(),
  notes: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const StaffingEngagementMaxAggregateInputObjectSchema: z.ZodType<Prisma.StaffingEngagementMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.StaffingEngagementMaxAggregateInputType>;
export const StaffingEngagementMaxAggregateInputObjectZodSchema = makeSchema();
