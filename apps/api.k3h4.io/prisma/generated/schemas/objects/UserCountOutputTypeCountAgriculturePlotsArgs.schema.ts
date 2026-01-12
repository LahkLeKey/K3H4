import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgriculturePlotWhereInputObjectSchema as AgriculturePlotWhereInputObjectSchema } from './AgriculturePlotWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgriculturePlotWhereInputObjectSchema).optional()
}).strict();
export const UserCountOutputTypeCountAgriculturePlotsArgsObjectSchema = makeSchema();
export const UserCountOutputTypeCountAgriculturePlotsArgsObjectZodSchema = makeSchema();
