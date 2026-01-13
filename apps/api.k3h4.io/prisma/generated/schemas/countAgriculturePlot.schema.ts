import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgriculturePlotOrderByWithRelationInputObjectSchema as AgriculturePlotOrderByWithRelationInputObjectSchema } from './objects/AgriculturePlotOrderByWithRelationInput.schema';
import { AgriculturePlotWhereInputObjectSchema as AgriculturePlotWhereInputObjectSchema } from './objects/AgriculturePlotWhereInput.schema';
import { AgriculturePlotWhereUniqueInputObjectSchema as AgriculturePlotWhereUniqueInputObjectSchema } from './objects/AgriculturePlotWhereUniqueInput.schema';
import { AgriculturePlotCountAggregateInputObjectSchema as AgriculturePlotCountAggregateInputObjectSchema } from './objects/AgriculturePlotCountAggregateInput.schema';

export const AgriculturePlotCountSchema: z.ZodType<Prisma.AgriculturePlotCountArgs> = z.object({ orderBy: z.union([AgriculturePlotOrderByWithRelationInputObjectSchema, AgriculturePlotOrderByWithRelationInputObjectSchema.array()]).optional(), where: AgriculturePlotWhereInputObjectSchema.optional(), cursor: AgriculturePlotWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), AgriculturePlotCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.AgriculturePlotCountArgs>;

export const AgriculturePlotCountZodSchema = z.object({ orderBy: z.union([AgriculturePlotOrderByWithRelationInputObjectSchema, AgriculturePlotOrderByWithRelationInputObjectSchema.array()]).optional(), where: AgriculturePlotWhereInputObjectSchema.optional(), cursor: AgriculturePlotWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), AgriculturePlotCountAggregateInputObjectSchema ]).optional() }).strict();