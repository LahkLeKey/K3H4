import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { LifecycleStatusSchema } from '../enums/LifecycleStatus.schema';
import { UserCreateNestedOneWithoutAgricultureCropPlansInputObjectSchema as UserCreateNestedOneWithoutAgricultureCropPlansInputObjectSchema } from './UserCreateNestedOneWithoutAgricultureCropPlansInput.schema';
import { AgriculturePlotCreateNestedOneWithoutCropPlansInputObjectSchema as AgriculturePlotCreateNestedOneWithoutCropPlansInputObjectSchema } from './AgriculturePlotCreateNestedOneWithoutCropPlansInput.schema'

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
  user: z.lazy(() => UserCreateNestedOneWithoutAgricultureCropPlansInputObjectSchema),
  plot: z.lazy(() => AgriculturePlotCreateNestedOneWithoutCropPlansInputObjectSchema)
}).strict();
export const AgricultureCropPlanCreateWithoutTasksInputObjectSchema: z.ZodType<Prisma.AgricultureCropPlanCreateWithoutTasksInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureCropPlanCreateWithoutTasksInput>;
export const AgricultureCropPlanCreateWithoutTasksInputObjectZodSchema = makeSchema();
