import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { AgriculturePlotArgsObjectSchema as AgriculturePlotArgsObjectSchema } from './AgriculturePlotArgs.schema';
import { AgricultureTaskFindManySchema as AgricultureTaskFindManySchema } from '../findManyAgricultureTask.schema';
import { AgricultureCropPlanCountOutputTypeArgsObjectSchema as AgricultureCropPlanCountOutputTypeArgsObjectSchema } from './AgricultureCropPlanCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  plot: z.union([z.boolean(), z.lazy(() => AgriculturePlotArgsObjectSchema)]).optional(),
  tasks: z.union([z.boolean(), z.lazy(() => AgricultureTaskFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => AgricultureCropPlanCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const AgricultureCropPlanIncludeObjectSchema: z.ZodType<Prisma.AgricultureCropPlanInclude> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureCropPlanInclude>;
export const AgricultureCropPlanIncludeObjectZodSchema = makeSchema();
