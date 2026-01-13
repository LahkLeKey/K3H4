import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgriculturePlotConditionSelectObjectSchema as AgriculturePlotConditionSelectObjectSchema } from './objects/AgriculturePlotConditionSelect.schema';
import { AgriculturePlotConditionCreateManyInputObjectSchema as AgriculturePlotConditionCreateManyInputObjectSchema } from './objects/AgriculturePlotConditionCreateManyInput.schema';

export const AgriculturePlotConditionCreateManyAndReturnSchema: z.ZodType<Prisma.AgriculturePlotConditionCreateManyAndReturnArgs> = z.object({ select: AgriculturePlotConditionSelectObjectSchema.optional(), data: z.union([ AgriculturePlotConditionCreateManyInputObjectSchema, z.array(AgriculturePlotConditionCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.AgriculturePlotConditionCreateManyAndReturnArgs>;

export const AgriculturePlotConditionCreateManyAndReturnZodSchema = z.object({ select: AgriculturePlotConditionSelectObjectSchema.optional(), data: z.union([ AgriculturePlotConditionCreateManyInputObjectSchema, z.array(AgriculturePlotConditionCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();