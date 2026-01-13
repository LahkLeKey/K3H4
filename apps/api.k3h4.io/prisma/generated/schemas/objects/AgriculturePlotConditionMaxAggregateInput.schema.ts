import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  plotId: z.literal(true).optional(),
  recordedAt: z.literal(true).optional(),
  temperature: z.literal(true).optional(),
  moisture: z.literal(true).optional(),
  ph: z.literal(true).optional(),
  notes: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const AgriculturePlotConditionMaxAggregateInputObjectSchema: z.ZodType<Prisma.AgriculturePlotConditionMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.AgriculturePlotConditionMaxAggregateInputType>;
export const AgriculturePlotConditionMaxAggregateInputObjectZodSchema = makeSchema();
