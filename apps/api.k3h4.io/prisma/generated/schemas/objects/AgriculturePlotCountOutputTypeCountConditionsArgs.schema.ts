import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgriculturePlotConditionWhereInputObjectSchema as AgriculturePlotConditionWhereInputObjectSchema } from './AgriculturePlotConditionWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgriculturePlotConditionWhereInputObjectSchema).optional()
}).strict();
export const AgriculturePlotCountOutputTypeCountConditionsArgsObjectSchema = makeSchema();
export const AgriculturePlotCountOutputTypeCountConditionsArgsObjectZodSchema = makeSchema();
