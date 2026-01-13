import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgriculturePlotUpdateManyMutationInputObjectSchema as AgriculturePlotUpdateManyMutationInputObjectSchema } from './objects/AgriculturePlotUpdateManyMutationInput.schema';
import { AgriculturePlotWhereInputObjectSchema as AgriculturePlotWhereInputObjectSchema } from './objects/AgriculturePlotWhereInput.schema';

export const AgriculturePlotUpdateManySchema: z.ZodType<Prisma.AgriculturePlotUpdateManyArgs> = z.object({ data: AgriculturePlotUpdateManyMutationInputObjectSchema, where: AgriculturePlotWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.AgriculturePlotUpdateManyArgs>;

export const AgriculturePlotUpdateManyZodSchema = z.object({ data: AgriculturePlotUpdateManyMutationInputObjectSchema, where: AgriculturePlotWhereInputObjectSchema.optional() }).strict();