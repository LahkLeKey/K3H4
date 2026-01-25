import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { LifecycleStatusSchema } from '../enums/LifecycleStatus.schema';
import { AgriculturePlotCreateNestedOneWithoutCropPlansInputObjectSchema as AgriculturePlotCreateNestedOneWithoutCropPlansInputObjectSchema } from './AgriculturePlotCreateNestedOneWithoutCropPlansInput.schema';
import { AgricultureTaskCreateNestedManyWithoutCropPlanInputObjectSchema as AgricultureTaskCreateNestedManyWithoutCropPlanInputObjectSchema } from './AgricultureTaskCreateNestedManyWithoutCropPlanInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  crop: z.string(),
  phase: z.string().optional(),
  status: LifecycleStatusSchema.optional(),
  startDate: z.coerce.date(),
  targetHarvestDate: z.coerce.date().optional().nullable(),
  endDate: z.coerce.date().optional().nullable(),
  notes: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  plot: z.lazy(() => AgriculturePlotCreateNestedOneWithoutCropPlansInputObjectSchema),
  tasks: z.lazy(() => AgricultureTaskCreateNestedManyWithoutCropPlanInputObjectSchema).optional()
}).strict();
export const AgricultureCropPlanCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.AgricultureCropPlanCreateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureCropPlanCreateWithoutUserInput>;
export const AgricultureCropPlanCreateWithoutUserInputObjectZodSchema = makeSchema();
