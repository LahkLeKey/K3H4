import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureCropPlanCountOutputTypeCountTasksArgsObjectSchema as AgricultureCropPlanCountOutputTypeCountTasksArgsObjectSchema } from './AgricultureCropPlanCountOutputTypeCountTasksArgs.schema'

const makeSchema = () => z.object({
  tasks: z.union([z.boolean(), z.lazy(() => AgricultureCropPlanCountOutputTypeCountTasksArgsObjectSchema)]).optional()
}).strict();
export const AgricultureCropPlanCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.AgricultureCropPlanCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureCropPlanCountOutputTypeSelect>;
export const AgricultureCropPlanCountOutputTypeSelectObjectZodSchema = makeSchema();
