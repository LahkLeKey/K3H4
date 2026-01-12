import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgriculturePlotConditionWhereInputObjectSchema as AgriculturePlotConditionWhereInputObjectSchema } from './AgriculturePlotConditionWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => AgriculturePlotConditionWhereInputObjectSchema).optional(),
  some: z.lazy(() => AgriculturePlotConditionWhereInputObjectSchema).optional(),
  none: z.lazy(() => AgriculturePlotConditionWhereInputObjectSchema).optional()
}).strict();
export const AgriculturePlotConditionListRelationFilterObjectSchema: z.ZodType<Prisma.AgriculturePlotConditionListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.AgriculturePlotConditionListRelationFilter>;
export const AgriculturePlotConditionListRelationFilterObjectZodSchema = makeSchema();
