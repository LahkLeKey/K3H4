import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgriculturePlotConditionSelectObjectSchema as AgriculturePlotConditionSelectObjectSchema } from './objects/AgriculturePlotConditionSelect.schema';
import { AgriculturePlotConditionIncludeObjectSchema as AgriculturePlotConditionIncludeObjectSchema } from './objects/AgriculturePlotConditionInclude.schema';
import { AgriculturePlotConditionCreateInputObjectSchema as AgriculturePlotConditionCreateInputObjectSchema } from './objects/AgriculturePlotConditionCreateInput.schema';
import { AgriculturePlotConditionUncheckedCreateInputObjectSchema as AgriculturePlotConditionUncheckedCreateInputObjectSchema } from './objects/AgriculturePlotConditionUncheckedCreateInput.schema';

export const AgriculturePlotConditionCreateOneSchema: z.ZodType<Prisma.AgriculturePlotConditionCreateArgs> = z.object({ select: AgriculturePlotConditionSelectObjectSchema.optional(), include: AgriculturePlotConditionIncludeObjectSchema.optional(), data: z.union([AgriculturePlotConditionCreateInputObjectSchema, AgriculturePlotConditionUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.AgriculturePlotConditionCreateArgs>;

export const AgriculturePlotConditionCreateOneZodSchema = z.object({ select: AgriculturePlotConditionSelectObjectSchema.optional(), include: AgriculturePlotConditionIncludeObjectSchema.optional(), data: z.union([AgriculturePlotConditionCreateInputObjectSchema, AgriculturePlotConditionUncheckedCreateInputObjectSchema]) }).strict();