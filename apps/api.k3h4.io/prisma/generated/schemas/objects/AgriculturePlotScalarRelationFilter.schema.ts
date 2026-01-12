import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgriculturePlotWhereInputObjectSchema as AgriculturePlotWhereInputObjectSchema } from './AgriculturePlotWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => AgriculturePlotWhereInputObjectSchema).optional(),
  isNot: z.lazy(() => AgriculturePlotWhereInputObjectSchema).optional()
}).strict();
export const AgriculturePlotScalarRelationFilterObjectSchema: z.ZodType<Prisma.AgriculturePlotScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.AgriculturePlotScalarRelationFilter>;
export const AgriculturePlotScalarRelationFilterObjectZodSchema = makeSchema();
