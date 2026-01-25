import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { LifecycleStatusSchema } from '../enums/LifecycleStatus.schema';
import { UserCreateNestedOneWithoutAgricultureCropPlansInputObjectSchema as UserCreateNestedOneWithoutAgricultureCropPlansInputObjectSchema } from './UserCreateNestedOneWithoutAgricultureCropPlansInput.schema';
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
  user: z.lazy(() => UserCreateNestedOneWithoutAgricultureCropPlansInputObjectSchema),
  tasks: z.lazy(() => AgricultureTaskCreateNestedManyWithoutCropPlanInputObjectSchema).optional()
}).strict();
export const AgricultureCropPlanCreateWithoutPlotInputObjectSchema: z.ZodType<Prisma.AgricultureCropPlanCreateWithoutPlotInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureCropPlanCreateWithoutPlotInput>;
export const AgricultureCropPlanCreateWithoutPlotInputObjectZodSchema = makeSchema();
