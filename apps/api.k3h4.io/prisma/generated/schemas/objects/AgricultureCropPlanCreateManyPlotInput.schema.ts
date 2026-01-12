import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  userId: z.string(),
  crop: z.string(),
  phase: z.string().optional(),
  status: z.string().optional(),
  startDate: z.coerce.date(),
  targetHarvestDate: z.coerce.date().optional().nullable(),
  endDate: z.coerce.date().optional().nullable(),
  notes: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const AgricultureCropPlanCreateManyPlotInputObjectSchema: z.ZodType<Prisma.AgricultureCropPlanCreateManyPlotInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureCropPlanCreateManyPlotInput>;
export const AgricultureCropPlanCreateManyPlotInputObjectZodSchema = makeSchema();
