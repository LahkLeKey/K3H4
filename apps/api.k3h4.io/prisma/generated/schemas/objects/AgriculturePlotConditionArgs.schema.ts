import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgriculturePlotConditionSelectObjectSchema as AgriculturePlotConditionSelectObjectSchema } from './AgriculturePlotConditionSelect.schema';
import { AgriculturePlotConditionIncludeObjectSchema as AgriculturePlotConditionIncludeObjectSchema } from './AgriculturePlotConditionInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => AgriculturePlotConditionSelectObjectSchema).optional(),
  include: z.lazy(() => AgriculturePlotConditionIncludeObjectSchema).optional()
}).strict();
export const AgriculturePlotConditionArgsObjectSchema = makeSchema();
export const AgriculturePlotConditionArgsObjectZodSchema = makeSchema();
