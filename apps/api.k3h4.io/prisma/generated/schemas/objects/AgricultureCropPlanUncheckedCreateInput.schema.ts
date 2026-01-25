import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { LifecycleStatusSchema } from '../enums/LifecycleStatus.schema';
import { AgricultureTaskUncheckedCreateNestedManyWithoutCropPlanInputObjectSchema as AgricultureTaskUncheckedCreateNestedManyWithoutCropPlanInputObjectSchema } from './AgricultureTaskUncheckedCreateNestedManyWithoutCropPlanInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  userId: z.string(),
  plotId: z.string(),
  crop: z.string(),
  phase: z.string().optional(),
  status: LifecycleStatusSchema.optional(),
  startDate: z.coerce.date(),
  targetHarvestDate: z.coerce.date().optional().nullable(),
  endDate: z.coerce.date().optional().nullable(),
  notes: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  tasks: z.lazy(() => AgricultureTaskUncheckedCreateNestedManyWithoutCropPlanInputObjectSchema).optional()
}).strict();
export const AgricultureCropPlanUncheckedCreateInputObjectSchema: z.ZodType<Prisma.AgricultureCropPlanUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureCropPlanUncheckedCreateInput>;
export const AgricultureCropPlanUncheckedCreateInputObjectZodSchema = makeSchema();
