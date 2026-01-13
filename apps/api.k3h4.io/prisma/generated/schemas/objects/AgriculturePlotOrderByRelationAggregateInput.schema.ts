import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const AgriculturePlotOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.AgriculturePlotOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.AgriculturePlotOrderByRelationAggregateInput>;
export const AgriculturePlotOrderByRelationAggregateInputObjectZodSchema = makeSchema();
