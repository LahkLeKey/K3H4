import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgriculturePlotWhereInputObjectSchema as AgriculturePlotWhereInputObjectSchema } from './objects/AgriculturePlotWhereInput.schema';

export const AgriculturePlotDeleteManySchema: z.ZodType<Prisma.AgriculturePlotDeleteManyArgs> = z.object({ where: AgriculturePlotWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.AgriculturePlotDeleteManyArgs>;

export const AgriculturePlotDeleteManyZodSchema = z.object({ where: AgriculturePlotWhereInputObjectSchema.optional() }).strict();