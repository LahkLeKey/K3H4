import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  plotId: z.literal(true).optional(),
  crop: z.literal(true).optional(),
  phase: z.literal(true).optional(),
  status: z.literal(true).optional(),
  startDate: z.literal(true).optional(),
  targetHarvestDate: z.literal(true).optional(),
  endDate: z.literal(true).optional(),
  notes: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const AgricultureCropPlanMaxAggregateInputObjectSchema: z.ZodType<Prisma.AgricultureCropPlanMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureCropPlanMaxAggregateInputType>;
export const AgricultureCropPlanMaxAggregateInputObjectZodSchema = makeSchema();
