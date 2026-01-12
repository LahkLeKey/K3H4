import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgriculturePlotConditionCreateManyInputObjectSchema as AgriculturePlotConditionCreateManyInputObjectSchema } from './objects/AgriculturePlotConditionCreateManyInput.schema';

export const AgriculturePlotConditionCreateManySchema: z.ZodType<Prisma.AgriculturePlotConditionCreateManyArgs> = z.object({ data: z.union([ AgriculturePlotConditionCreateManyInputObjectSchema, z.array(AgriculturePlotConditionCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.AgriculturePlotConditionCreateManyArgs>;

export const AgriculturePlotConditionCreateManyZodSchema = z.object({ data: z.union([ AgriculturePlotConditionCreateManyInputObjectSchema, z.array(AgriculturePlotConditionCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();