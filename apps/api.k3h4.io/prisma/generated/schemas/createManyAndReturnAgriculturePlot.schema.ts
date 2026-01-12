import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgriculturePlotSelectObjectSchema as AgriculturePlotSelectObjectSchema } from './objects/AgriculturePlotSelect.schema';
import { AgriculturePlotCreateManyInputObjectSchema as AgriculturePlotCreateManyInputObjectSchema } from './objects/AgriculturePlotCreateManyInput.schema';

export const AgriculturePlotCreateManyAndReturnSchema: z.ZodType<Prisma.AgriculturePlotCreateManyAndReturnArgs> = z.object({ select: AgriculturePlotSelectObjectSchema.optional(), data: z.union([ AgriculturePlotCreateManyInputObjectSchema, z.array(AgriculturePlotCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.AgriculturePlotCreateManyAndReturnArgs>;

export const AgriculturePlotCreateManyAndReturnZodSchema = z.object({ select: AgriculturePlotSelectObjectSchema.optional(), data: z.union([ AgriculturePlotCreateManyInputObjectSchema, z.array(AgriculturePlotCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();