import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureCropPlanWhereInputObjectSchema as AgricultureCropPlanWhereInputObjectSchema } from './AgricultureCropPlanWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgricultureCropPlanWhereInputObjectSchema).optional()
}).strict();
export const AgriculturePlotCountOutputTypeCountCropPlansArgsObjectSchema = makeSchema();
export const AgriculturePlotCountOutputTypeCountCropPlansArgsObjectZodSchema = makeSchema();
