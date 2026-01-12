import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgriculturePlotCountOutputTypeCountCropPlansArgsObjectSchema as AgriculturePlotCountOutputTypeCountCropPlansArgsObjectSchema } from './AgriculturePlotCountOutputTypeCountCropPlansArgs.schema';
import { AgriculturePlotCountOutputTypeCountConditionsArgsObjectSchema as AgriculturePlotCountOutputTypeCountConditionsArgsObjectSchema } from './AgriculturePlotCountOutputTypeCountConditionsArgs.schema';
import { AgriculturePlotCountOutputTypeCountTasksArgsObjectSchema as AgriculturePlotCountOutputTypeCountTasksArgsObjectSchema } from './AgriculturePlotCountOutputTypeCountTasksArgs.schema';
import { AgriculturePlotCountOutputTypeCountSlotsArgsObjectSchema as AgriculturePlotCountOutputTypeCountSlotsArgsObjectSchema } from './AgriculturePlotCountOutputTypeCountSlotsArgs.schema'

const makeSchema = () => z.object({
  cropPlans: z.union([z.boolean(), z.lazy(() => AgriculturePlotCountOutputTypeCountCropPlansArgsObjectSchema)]).optional(),
  conditions: z.union([z.boolean(), z.lazy(() => AgriculturePlotCountOutputTypeCountConditionsArgsObjectSchema)]).optional(),
  tasks: z.union([z.boolean(), z.lazy(() => AgriculturePlotCountOutputTypeCountTasksArgsObjectSchema)]).optional(),
  slots: z.union([z.boolean(), z.lazy(() => AgriculturePlotCountOutputTypeCountSlotsArgsObjectSchema)]).optional()
}).strict();
export const AgriculturePlotCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.AgriculturePlotCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.AgriculturePlotCountOutputTypeSelect>;
export const AgriculturePlotCountOutputTypeSelectObjectZodSchema = makeSchema();
