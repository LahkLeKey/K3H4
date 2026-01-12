import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgriculturePlotSelectObjectSchema as AgriculturePlotSelectObjectSchema } from './AgriculturePlotSelect.schema';
import { AgriculturePlotIncludeObjectSchema as AgriculturePlotIncludeObjectSchema } from './AgriculturePlotInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => AgriculturePlotSelectObjectSchema).optional(),
  include: z.lazy(() => AgriculturePlotIncludeObjectSchema).optional()
}).strict();
export const AgriculturePlotArgsObjectSchema = makeSchema();
export const AgriculturePlotArgsObjectZodSchema = makeSchema();
