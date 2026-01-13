import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  plotId: z.literal(true).optional(),
  cropPlanId: z.literal(true).optional(),
  title: z.literal(true).optional(),
  assignee: z.literal(true).optional(),
  priority: z.literal(true).optional(),
  notes: z.literal(true).optional(),
  dueDate: z.literal(true).optional(),
  status: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const AgricultureTaskMinAggregateInputObjectSchema: z.ZodType<Prisma.AgricultureTaskMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureTaskMinAggregateInputType>;
export const AgricultureTaskMinAggregateInputObjectZodSchema = makeSchema();
