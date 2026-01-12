import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  name: z.literal(true).optional(),
  fieldCode: z.literal(true).optional(),
  crop: z.literal(true).optional(),
  stage: z.literal(true).optional(),
  acres: z.literal(true).optional(),
  health: z.literal(true).optional(),
  soilType: z.literal(true).optional(),
  irrigationZone: z.literal(true).optional(),
  notes: z.literal(true).optional(),
  lastConditionAt: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const AgriculturePlotCountAggregateInputObjectSchema: z.ZodType<Prisma.AgriculturePlotCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.AgriculturePlotCountAggregateInputType>;
export const AgriculturePlotCountAggregateInputObjectZodSchema = makeSchema();
