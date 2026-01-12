import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgriculturePlotConditionSelectObjectSchema as AgriculturePlotConditionSelectObjectSchema } from './objects/AgriculturePlotConditionSelect.schema';
import { AgriculturePlotConditionIncludeObjectSchema as AgriculturePlotConditionIncludeObjectSchema } from './objects/AgriculturePlotConditionInclude.schema';
import { AgriculturePlotConditionWhereUniqueInputObjectSchema as AgriculturePlotConditionWhereUniqueInputObjectSchema } from './objects/AgriculturePlotConditionWhereUniqueInput.schema';

export const AgriculturePlotConditionDeleteOneSchema: z.ZodType<Prisma.AgriculturePlotConditionDeleteArgs> = z.object({ select: AgriculturePlotConditionSelectObjectSchema.optional(), include: AgriculturePlotConditionIncludeObjectSchema.optional(), where: AgriculturePlotConditionWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.AgriculturePlotConditionDeleteArgs>;

export const AgriculturePlotConditionDeleteOneZodSchema = z.object({ select: AgriculturePlotConditionSelectObjectSchema.optional(), include: AgriculturePlotConditionIncludeObjectSchema.optional(), where: AgriculturePlotConditionWhereUniqueInputObjectSchema }).strict();