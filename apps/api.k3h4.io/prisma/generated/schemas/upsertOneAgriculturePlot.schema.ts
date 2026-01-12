import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgriculturePlotSelectObjectSchema as AgriculturePlotSelectObjectSchema } from './objects/AgriculturePlotSelect.schema';
import { AgriculturePlotIncludeObjectSchema as AgriculturePlotIncludeObjectSchema } from './objects/AgriculturePlotInclude.schema';
import { AgriculturePlotWhereUniqueInputObjectSchema as AgriculturePlotWhereUniqueInputObjectSchema } from './objects/AgriculturePlotWhereUniqueInput.schema';
import { AgriculturePlotCreateInputObjectSchema as AgriculturePlotCreateInputObjectSchema } from './objects/AgriculturePlotCreateInput.schema';
import { AgriculturePlotUncheckedCreateInputObjectSchema as AgriculturePlotUncheckedCreateInputObjectSchema } from './objects/AgriculturePlotUncheckedCreateInput.schema';
import { AgriculturePlotUpdateInputObjectSchema as AgriculturePlotUpdateInputObjectSchema } from './objects/AgriculturePlotUpdateInput.schema';
import { AgriculturePlotUncheckedUpdateInputObjectSchema as AgriculturePlotUncheckedUpdateInputObjectSchema } from './objects/AgriculturePlotUncheckedUpdateInput.schema';

export const AgriculturePlotUpsertOneSchema: z.ZodType<Prisma.AgriculturePlotUpsertArgs> = z.object({ select: AgriculturePlotSelectObjectSchema.optional(), include: AgriculturePlotIncludeObjectSchema.optional(), where: AgriculturePlotWhereUniqueInputObjectSchema, create: z.union([ AgriculturePlotCreateInputObjectSchema, AgriculturePlotUncheckedCreateInputObjectSchema ]), update: z.union([ AgriculturePlotUpdateInputObjectSchema, AgriculturePlotUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.AgriculturePlotUpsertArgs>;

export const AgriculturePlotUpsertOneZodSchema = z.object({ select: AgriculturePlotSelectObjectSchema.optional(), include: AgriculturePlotIncludeObjectSchema.optional(), where: AgriculturePlotWhereUniqueInputObjectSchema, create: z.union([ AgriculturePlotCreateInputObjectSchema, AgriculturePlotUncheckedCreateInputObjectSchema ]), update: z.union([ AgriculturePlotUpdateInputObjectSchema, AgriculturePlotUncheckedUpdateInputObjectSchema ]) }).strict();