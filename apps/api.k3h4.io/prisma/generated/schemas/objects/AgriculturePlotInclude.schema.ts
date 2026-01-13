import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { AgricultureCropPlanFindManySchema as AgricultureCropPlanFindManySchema } from '../findManyAgricultureCropPlan.schema';
import { AgriculturePlotConditionFindManySchema as AgriculturePlotConditionFindManySchema } from '../findManyAgriculturePlotCondition.schema';
import { AgricultureTaskFindManySchema as AgricultureTaskFindManySchema } from '../findManyAgricultureTask.schema';
import { AgricultureSlotFindManySchema as AgricultureSlotFindManySchema } from '../findManyAgricultureSlot.schema';
import { AgriculturePlotCountOutputTypeArgsObjectSchema as AgriculturePlotCountOutputTypeArgsObjectSchema } from './AgriculturePlotCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  cropPlans: z.union([z.boolean(), z.lazy(() => AgricultureCropPlanFindManySchema)]).optional(),
  conditions: z.union([z.boolean(), z.lazy(() => AgriculturePlotConditionFindManySchema)]).optional(),
  tasks: z.union([z.boolean(), z.lazy(() => AgricultureTaskFindManySchema)]).optional(),
  slots: z.union([z.boolean(), z.lazy(() => AgricultureSlotFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => AgriculturePlotCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const AgriculturePlotIncludeObjectSchema: z.ZodType<Prisma.AgriculturePlotInclude> = makeSchema() as unknown as z.ZodType<Prisma.AgriculturePlotInclude>;
export const AgriculturePlotIncludeObjectZodSchema = makeSchema();
