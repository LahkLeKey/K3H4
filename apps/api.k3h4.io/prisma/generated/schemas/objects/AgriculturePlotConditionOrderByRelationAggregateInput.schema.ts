import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const AgriculturePlotConditionOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.AgriculturePlotConditionOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.AgriculturePlotConditionOrderByRelationAggregateInput>;
export const AgriculturePlotConditionOrderByRelationAggregateInputObjectZodSchema = makeSchema();
