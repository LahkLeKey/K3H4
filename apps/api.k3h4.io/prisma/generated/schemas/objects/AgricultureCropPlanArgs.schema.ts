import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureCropPlanSelectObjectSchema as AgricultureCropPlanSelectObjectSchema } from './AgricultureCropPlanSelect.schema';
import { AgricultureCropPlanIncludeObjectSchema as AgricultureCropPlanIncludeObjectSchema } from './AgricultureCropPlanInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => AgricultureCropPlanSelectObjectSchema).optional(),
  include: z.lazy(() => AgricultureCropPlanIncludeObjectSchema).optional()
}).strict();
export const AgricultureCropPlanArgsObjectSchema = makeSchema();
export const AgricultureCropPlanArgsObjectZodSchema = makeSchema();
