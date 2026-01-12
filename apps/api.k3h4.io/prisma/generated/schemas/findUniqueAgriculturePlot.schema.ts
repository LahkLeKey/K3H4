import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgriculturePlotSelectObjectSchema as AgriculturePlotSelectObjectSchema } from './objects/AgriculturePlotSelect.schema';
import { AgriculturePlotIncludeObjectSchema as AgriculturePlotIncludeObjectSchema } from './objects/AgriculturePlotInclude.schema';
import { AgriculturePlotWhereUniqueInputObjectSchema as AgriculturePlotWhereUniqueInputObjectSchema } from './objects/AgriculturePlotWhereUniqueInput.schema';

export const AgriculturePlotFindUniqueSchema: z.ZodType<Prisma.AgriculturePlotFindUniqueArgs> = z.object({ select: AgriculturePlotSelectObjectSchema.optional(), include: AgriculturePlotIncludeObjectSchema.optional(), where: AgriculturePlotWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.AgriculturePlotFindUniqueArgs>;

export const AgriculturePlotFindUniqueZodSchema = z.object({ select: AgriculturePlotSelectObjectSchema.optional(), include: AgriculturePlotIncludeObjectSchema.optional(), where: AgriculturePlotWhereUniqueInputObjectSchema }).strict();