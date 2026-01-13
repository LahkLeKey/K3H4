import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureCropPlanCountOutputTypeSelectObjectSchema as AgricultureCropPlanCountOutputTypeSelectObjectSchema } from './AgricultureCropPlanCountOutputTypeSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => AgricultureCropPlanCountOutputTypeSelectObjectSchema).optional()
}).strict();
export const AgricultureCropPlanCountOutputTypeArgsObjectSchema = makeSchema();
export const AgricultureCropPlanCountOutputTypeArgsObjectZodSchema = makeSchema();
