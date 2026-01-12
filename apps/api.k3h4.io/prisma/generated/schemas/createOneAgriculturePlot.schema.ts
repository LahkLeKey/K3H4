import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgriculturePlotSelectObjectSchema as AgriculturePlotSelectObjectSchema } from './objects/AgriculturePlotSelect.schema';
import { AgriculturePlotIncludeObjectSchema as AgriculturePlotIncludeObjectSchema } from './objects/AgriculturePlotInclude.schema';
import { AgriculturePlotCreateInputObjectSchema as AgriculturePlotCreateInputObjectSchema } from './objects/AgriculturePlotCreateInput.schema';
import { AgriculturePlotUncheckedCreateInputObjectSchema as AgriculturePlotUncheckedCreateInputObjectSchema } from './objects/AgriculturePlotUncheckedCreateInput.schema';

export const AgriculturePlotCreateOneSchema: z.ZodType<Prisma.AgriculturePlotCreateArgs> = z.object({ select: AgriculturePlotSelectObjectSchema.optional(), include: AgriculturePlotIncludeObjectSchema.optional(), data: z.union([AgriculturePlotCreateInputObjectSchema, AgriculturePlotUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.AgriculturePlotCreateArgs>;

export const AgriculturePlotCreateOneZodSchema = z.object({ select: AgriculturePlotSelectObjectSchema.optional(), include: AgriculturePlotIncludeObjectSchema.optional(), data: z.union([AgriculturePlotCreateInputObjectSchema, AgriculturePlotUncheckedCreateInputObjectSchema]) }).strict();