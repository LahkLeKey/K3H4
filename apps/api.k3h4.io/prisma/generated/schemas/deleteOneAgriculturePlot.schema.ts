import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgriculturePlotSelectObjectSchema as AgriculturePlotSelectObjectSchema } from './objects/AgriculturePlotSelect.schema';
import { AgriculturePlotIncludeObjectSchema as AgriculturePlotIncludeObjectSchema } from './objects/AgriculturePlotInclude.schema';
import { AgriculturePlotWhereUniqueInputObjectSchema as AgriculturePlotWhereUniqueInputObjectSchema } from './objects/AgriculturePlotWhereUniqueInput.schema';

export const AgriculturePlotDeleteOneSchema: z.ZodType<Prisma.AgriculturePlotDeleteArgs> = z.object({ select: AgriculturePlotSelectObjectSchema.optional(), include: AgriculturePlotIncludeObjectSchema.optional(), where: AgriculturePlotWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.AgriculturePlotDeleteArgs>;

export const AgriculturePlotDeleteOneZodSchema = z.object({ select: AgriculturePlotSelectObjectSchema.optional(), include: AgriculturePlotIncludeObjectSchema.optional(), where: AgriculturePlotWhereUniqueInputObjectSchema }).strict();