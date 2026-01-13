import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgriculturePlotConditionWhereInputObjectSchema as AgriculturePlotConditionWhereInputObjectSchema } from './objects/AgriculturePlotConditionWhereInput.schema';

export const AgriculturePlotConditionDeleteManySchema: z.ZodType<Prisma.AgriculturePlotConditionDeleteManyArgs> = z.object({ where: AgriculturePlotConditionWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.AgriculturePlotConditionDeleteManyArgs>;

export const AgriculturePlotConditionDeleteManyZodSchema = z.object({ where: AgriculturePlotConditionWhereInputObjectSchema.optional() }).strict();