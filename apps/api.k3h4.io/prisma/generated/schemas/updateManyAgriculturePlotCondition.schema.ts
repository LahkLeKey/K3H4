import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgriculturePlotConditionUpdateManyMutationInputObjectSchema as AgriculturePlotConditionUpdateManyMutationInputObjectSchema } from './objects/AgriculturePlotConditionUpdateManyMutationInput.schema';
import { AgriculturePlotConditionWhereInputObjectSchema as AgriculturePlotConditionWhereInputObjectSchema } from './objects/AgriculturePlotConditionWhereInput.schema';

export const AgriculturePlotConditionUpdateManySchema: z.ZodType<Prisma.AgriculturePlotConditionUpdateManyArgs> = z.object({ data: AgriculturePlotConditionUpdateManyMutationInputObjectSchema, where: AgriculturePlotConditionWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.AgriculturePlotConditionUpdateManyArgs>;

export const AgriculturePlotConditionUpdateManyZodSchema = z.object({ data: AgriculturePlotConditionUpdateManyMutationInputObjectSchema, where: AgriculturePlotConditionWhereInputObjectSchema.optional() }).strict();