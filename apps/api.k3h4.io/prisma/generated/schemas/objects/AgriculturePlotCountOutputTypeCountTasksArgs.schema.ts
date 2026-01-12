import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureTaskWhereInputObjectSchema as AgricultureTaskWhereInputObjectSchema } from './AgricultureTaskWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgricultureTaskWhereInputObjectSchema).optional()
}).strict();
export const AgriculturePlotCountOutputTypeCountTasksArgsObjectSchema = makeSchema();
export const AgriculturePlotCountOutputTypeCountTasksArgsObjectZodSchema = makeSchema();
