import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureTaskWhereInputObjectSchema as AgricultureTaskWhereInputObjectSchema } from './AgricultureTaskWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgricultureTaskWhereInputObjectSchema).optional()
}).strict();
export const AgricultureCropPlanCountOutputTypeCountTasksArgsObjectSchema = makeSchema();
export const AgricultureCropPlanCountOutputTypeCountTasksArgsObjectZodSchema = makeSchema();
