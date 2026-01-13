import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { AgricultureCropPlanFindManySchema as AgricultureCropPlanFindManySchema } from '../findManyAgricultureCropPlan.schema';
import { AgriculturePlotConditionFindManySchema as AgriculturePlotConditionFindManySchema } from '../findManyAgriculturePlotCondition.schema';
import { AgricultureTaskFindManySchema as AgricultureTaskFindManySchema } from '../findManyAgricultureTask.schema';
import { AgricultureSlotFindManySchema as AgricultureSlotFindManySchema } from '../findManyAgricultureSlot.schema';
import { AgriculturePlotCountOutputTypeArgsObjectSchema as AgriculturePlotCountOutputTypeArgsObjectSchema } from './AgriculturePlotCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  name: z.boolean().optional(),
  fieldCode: z.boolean().optional(),
  crop: z.boolean().optional(),
  stage: z.boolean().optional(),
  acres: z.boolean().optional(),
  health: z.boolean().optional(),
  soilType: z.boolean().optional(),
  irrigationZone: z.boolean().optional(),
  notes: z.boolean().optional(),
  lastConditionAt: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  cropPlans: z.union([z.boolean(), z.lazy(() => AgricultureCropPlanFindManySchema)]).optional(),
  conditions: z.union([z.boolean(), z.lazy(() => AgriculturePlotConditionFindManySchema)]).optional(),
  tasks: z.union([z.boolean(), z.lazy(() => AgricultureTaskFindManySchema)]).optional(),
  slots: z.union([z.boolean(), z.lazy(() => AgricultureSlotFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => AgriculturePlotCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const AgriculturePlotSelectObjectSchema: z.ZodType<Prisma.AgriculturePlotSelect> = makeSchema() as unknown as z.ZodType<Prisma.AgriculturePlotSelect>;
export const AgriculturePlotSelectObjectZodSchema = makeSchema();
