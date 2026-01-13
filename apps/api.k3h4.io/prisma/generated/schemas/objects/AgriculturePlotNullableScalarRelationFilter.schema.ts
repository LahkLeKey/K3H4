import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgriculturePlotWhereInputObjectSchema as AgriculturePlotWhereInputObjectSchema } from './AgriculturePlotWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => AgriculturePlotWhereInputObjectSchema).optional().nullable(),
  isNot: z.lazy(() => AgriculturePlotWhereInputObjectSchema).optional().nullable()
}).strict();
export const AgriculturePlotNullableScalarRelationFilterObjectSchema: z.ZodType<Prisma.AgriculturePlotNullableScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.AgriculturePlotNullableScalarRelationFilter>;
export const AgriculturePlotNullableScalarRelationFilterObjectZodSchema = makeSchema();
