import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { AgriculturePlotArgsObjectSchema as AgriculturePlotArgsObjectSchema } from './AgriculturePlotArgs.schema';
import { AgricultureCropPlanArgsObjectSchema as AgricultureCropPlanArgsObjectSchema } from './AgricultureCropPlanArgs.schema'

const makeSchema = () => z.object({
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  plot: z.union([z.boolean(), z.lazy(() => AgriculturePlotArgsObjectSchema)]).optional(),
  cropPlan: z.union([z.boolean(), z.lazy(() => AgricultureCropPlanArgsObjectSchema)]).optional()
}).strict();
export const AgricultureTaskIncludeObjectSchema: z.ZodType<Prisma.AgricultureTaskInclude> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureTaskInclude>;
export const AgricultureTaskIncludeObjectZodSchema = makeSchema();
