import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgriculturePlotConditionSelectObjectSchema as AgriculturePlotConditionSelectObjectSchema } from './objects/AgriculturePlotConditionSelect.schema';
import { AgriculturePlotConditionIncludeObjectSchema as AgriculturePlotConditionIncludeObjectSchema } from './objects/AgriculturePlotConditionInclude.schema';
import { AgriculturePlotConditionUpdateInputObjectSchema as AgriculturePlotConditionUpdateInputObjectSchema } from './objects/AgriculturePlotConditionUpdateInput.schema';
import { AgriculturePlotConditionUncheckedUpdateInputObjectSchema as AgriculturePlotConditionUncheckedUpdateInputObjectSchema } from './objects/AgriculturePlotConditionUncheckedUpdateInput.schema';
import { AgriculturePlotConditionWhereUniqueInputObjectSchema as AgriculturePlotConditionWhereUniqueInputObjectSchema } from './objects/AgriculturePlotConditionWhereUniqueInput.schema';

export const AgriculturePlotConditionUpdateOneSchema: z.ZodType<Prisma.AgriculturePlotConditionUpdateArgs> = z.object({ select: AgriculturePlotConditionSelectObjectSchema.optional(), include: AgriculturePlotConditionIncludeObjectSchema.optional(), data: z.union([AgriculturePlotConditionUpdateInputObjectSchema, AgriculturePlotConditionUncheckedUpdateInputObjectSchema]), where: AgriculturePlotConditionWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.AgriculturePlotConditionUpdateArgs>;

export const AgriculturePlotConditionUpdateOneZodSchema = z.object({ select: AgriculturePlotConditionSelectObjectSchema.optional(), include: AgriculturePlotConditionIncludeObjectSchema.optional(), data: z.union([AgriculturePlotConditionUpdateInputObjectSchema, AgriculturePlotConditionUncheckedUpdateInputObjectSchema]), where: AgriculturePlotConditionWhereUniqueInputObjectSchema }).strict();