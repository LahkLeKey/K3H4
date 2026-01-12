import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgriculturePlotSelectObjectSchema as AgriculturePlotSelectObjectSchema } from './objects/AgriculturePlotSelect.schema';
import { AgriculturePlotUpdateManyMutationInputObjectSchema as AgriculturePlotUpdateManyMutationInputObjectSchema } from './objects/AgriculturePlotUpdateManyMutationInput.schema';
import { AgriculturePlotWhereInputObjectSchema as AgriculturePlotWhereInputObjectSchema } from './objects/AgriculturePlotWhereInput.schema';

export const AgriculturePlotUpdateManyAndReturnSchema: z.ZodType<Prisma.AgriculturePlotUpdateManyAndReturnArgs> = z.object({ select: AgriculturePlotSelectObjectSchema.optional(), data: AgriculturePlotUpdateManyMutationInputObjectSchema, where: AgriculturePlotWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.AgriculturePlotUpdateManyAndReturnArgs>;

export const AgriculturePlotUpdateManyAndReturnZodSchema = z.object({ select: AgriculturePlotSelectObjectSchema.optional(), data: AgriculturePlotUpdateManyMutationInputObjectSchema, where: AgriculturePlotWhereInputObjectSchema.optional() }).strict();