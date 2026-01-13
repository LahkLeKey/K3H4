import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgriculturePlotCountOutputTypeSelectObjectSchema as AgriculturePlotCountOutputTypeSelectObjectSchema } from './AgriculturePlotCountOutputTypeSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => AgriculturePlotCountOutputTypeSelectObjectSchema).optional()
}).strict();
export const AgriculturePlotCountOutputTypeArgsObjectSchema = makeSchema();
export const AgriculturePlotCountOutputTypeArgsObjectZodSchema = makeSchema();
