import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureSlotWhereInputObjectSchema as AgricultureSlotWhereInputObjectSchema } from './AgricultureSlotWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgricultureSlotWhereInputObjectSchema).optional()
}).strict();
export const AgriculturePlotCountOutputTypeCountSlotsArgsObjectSchema = makeSchema();
export const AgriculturePlotCountOutputTypeCountSlotsArgsObjectZodSchema = makeSchema();
