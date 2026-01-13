import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgriculturePlotCreateManyInputObjectSchema as AgriculturePlotCreateManyInputObjectSchema } from './objects/AgriculturePlotCreateManyInput.schema';

export const AgriculturePlotCreateManySchema: z.ZodType<Prisma.AgriculturePlotCreateManyArgs> = z.object({ data: z.union([ AgriculturePlotCreateManyInputObjectSchema, z.array(AgriculturePlotCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.AgriculturePlotCreateManyArgs>;

export const AgriculturePlotCreateManyZodSchema = z.object({ data: z.union([ AgriculturePlotCreateManyInputObjectSchema, z.array(AgriculturePlotCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();