import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { AgriculturePlotArgsObjectSchema as AgriculturePlotArgsObjectSchema } from './AgriculturePlotArgs.schema';
import { AgricultureTaskFindManySchema as AgricultureTaskFindManySchema } from '../findManyAgricultureTask.schema';
import { AgricultureCropPlanCountOutputTypeArgsObjectSchema as AgricultureCropPlanCountOutputTypeArgsObjectSchema } from './AgricultureCropPlanCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  plotId: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  plot: z.union([z.boolean(), z.lazy(() => AgriculturePlotArgsObjectSchema)]).optional(),
  crop: z.boolean().optional(),
  phase: z.boolean().optional(),
  status: z.boolean().optional(),
  startDate: z.boolean().optional(),
  targetHarvestDate: z.boolean().optional(),
  endDate: z.boolean().optional(),
  notes: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  tasks: z.union([z.boolean(), z.lazy(() => AgricultureTaskFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => AgricultureCropPlanCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const AgricultureCropPlanSelectObjectSchema: z.ZodType<Prisma.AgricultureCropPlanSelect> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureCropPlanSelect>;
export const AgricultureCropPlanSelectObjectZodSchema = makeSchema();
