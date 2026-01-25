import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { LifecycleStatusSchema } from '../enums/LifecycleStatus.schema';
import { UserCreateNestedOneWithoutAgricultureCropPlansInputObjectSchema as UserCreateNestedOneWithoutAgricultureCropPlansInputObjectSchema } from './UserCreateNestedOneWithoutAgricultureCropPlansInput.schema';
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
  user: z.lazy(() => UserCreateNestedOneWithoutAgricultureCropPlansInputObjectSchema),
  plot: z.lazy(() => AgriculturePlotCreateNestedOneWithoutCropPlansInputObjectSchema),
  tasks: z.lazy(() => AgricultureTaskCreateNestedManyWithoutCropPlanInputObjectSchema).optional()
}).strict();
export const AgricultureCropPlanCreateInputObjectSchema: z.ZodType<Prisma.AgricultureCropPlanCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureCropPlanCreateInput>;
export const AgricultureCropPlanCreateInputObjectZodSchema = makeSchema();
