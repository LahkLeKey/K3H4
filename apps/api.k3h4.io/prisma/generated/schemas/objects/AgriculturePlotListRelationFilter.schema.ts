import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgriculturePlotWhereInputObjectSchema as AgriculturePlotWhereInputObjectSchema } from './AgriculturePlotWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => AgriculturePlotWhereInputObjectSchema).optional(),
  some: z.lazy(() => AgriculturePlotWhereInputObjectSchema).optional(),
  none: z.lazy(() => AgriculturePlotWhereInputObjectSchema).optional()
}).strict();
export const AgriculturePlotListRelationFilterObjectSchema: z.ZodType<Prisma.AgriculturePlotListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.AgriculturePlotListRelationFilter>;
export const AgriculturePlotListRelationFilterObjectZodSchema = makeSchema();
