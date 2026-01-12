import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgriculturePlotConditionSelectObjectSchema as AgriculturePlotConditionSelectObjectSchema } from './objects/AgriculturePlotConditionSelect.schema';
import { AgriculturePlotConditionUpdateManyMutationInputObjectSchema as AgriculturePlotConditionUpdateManyMutationInputObjectSchema } from './objects/AgriculturePlotConditionUpdateManyMutationInput.schema';
import { AgriculturePlotConditionWhereInputObjectSchema as AgriculturePlotConditionWhereInputObjectSchema } from './objects/AgriculturePlotConditionWhereInput.schema';

export const AgriculturePlotConditionUpdateManyAndReturnSchema: z.ZodType<Prisma.AgriculturePlotConditionUpdateManyAndReturnArgs> = z.object({ select: AgriculturePlotConditionSelectObjectSchema.optional(), data: AgriculturePlotConditionUpdateManyMutationInputObjectSchema, where: AgriculturePlotConditionWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.AgriculturePlotConditionUpdateManyAndReturnArgs>;

export const AgriculturePlotConditionUpdateManyAndReturnZodSchema = z.object({ select: AgriculturePlotConditionSelectObjectSchema.optional(), data: AgriculturePlotConditionUpdateManyMutationInputObjectSchema, where: AgriculturePlotConditionWhereInputObjectSchema.optional() }).strict();