import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { LifecycleStatusSchema } from '../enums/LifecycleStatus.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  plotId: z.string(),
  crop: z.string(),
  phase: z.string().optional(),
  status: LifecycleStatusSchema.optional(),
  startDate: z.coerce.date(),
  targetHarvestDate: z.coerce.date().optional().nullable(),
  endDate: z.coerce.date().optional().nullable(),
  notes: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const AgricultureCropPlanCreateManyUserInputObjectSchema: z.ZodType<Prisma.AgricultureCropPlanCreateManyUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureCropPlanCreateManyUserInput>;
export const AgricultureCropPlanCreateManyUserInputObjectZodSchema = makeSchema();
