import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgriculturePlotSelectObjectSchema as AgriculturePlotSelectObjectSchema } from './objects/AgriculturePlotSelect.schema';
import { AgriculturePlotIncludeObjectSchema as AgriculturePlotIncludeObjectSchema } from './objects/AgriculturePlotInclude.schema';
import { AgriculturePlotUpdateInputObjectSchema as AgriculturePlotUpdateInputObjectSchema } from './objects/AgriculturePlotUpdateInput.schema';
import { AgriculturePlotUncheckedUpdateInputObjectSchema as AgriculturePlotUncheckedUpdateInputObjectSchema } from './objects/AgriculturePlotUncheckedUpdateInput.schema';
import { AgriculturePlotWhereUniqueInputObjectSchema as AgriculturePlotWhereUniqueInputObjectSchema } from './objects/AgriculturePlotWhereUniqueInput.schema';

export const AgriculturePlotUpdateOneSchema: z.ZodType<Prisma.AgriculturePlotUpdateArgs> = z.object({ select: AgriculturePlotSelectObjectSchema.optional(), include: AgriculturePlotIncludeObjectSchema.optional(), data: z.union([AgriculturePlotUpdateInputObjectSchema, AgriculturePlotUncheckedUpdateInputObjectSchema]), where: AgriculturePlotWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.AgriculturePlotUpdateArgs>;

export const AgriculturePlotUpdateOneZodSchema = z.object({ select: AgriculturePlotSelectObjectSchema.optional(), include: AgriculturePlotIncludeObjectSchema.optional(), data: z.union([AgriculturePlotUpdateInputObjectSchema, AgriculturePlotUncheckedUpdateInputObjectSchema]), where: AgriculturePlotWhereUniqueInputObjectSchema }).strict();