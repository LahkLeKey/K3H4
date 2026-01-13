import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureTaskOrderByWithRelationInputObjectSchema as AgricultureTaskOrderByWithRelationInputObjectSchema } from './objects/AgricultureTaskOrderByWithRelationInput.schema';
import { AgricultureTaskWhereInputObjectSchema as AgricultureTaskWhereInputObjectSchema } from './objects/AgricultureTaskWhereInput.schema';
import { AgricultureTaskWhereUniqueInputObjectSchema as AgricultureTaskWhereUniqueInputObjectSchema } from './objects/AgricultureTaskWhereUniqueInput.schema';
import { AgricultureTaskCountAggregateInputObjectSchema as AgricultureTaskCountAggregateInputObjectSchema } from './objects/AgricultureTaskCountAggregateInput.schema';

export const AgricultureTaskCountSchema: z.ZodType<Prisma.AgricultureTaskCountArgs> = z.object({ orderBy: z.union([AgricultureTaskOrderByWithRelationInputObjectSchema, AgricultureTaskOrderByWithRelationInputObjectSchema.array()]).optional(), where: AgricultureTaskWhereInputObjectSchema.optional(), cursor: AgricultureTaskWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), AgricultureTaskCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.AgricultureTaskCountArgs>;

export const AgricultureTaskCountZodSchema = z.object({ orderBy: z.union([AgricultureTaskOrderByWithRelationInputObjectSchema, AgricultureTaskOrderByWithRelationInputObjectSchema.array()]).optional(), where: AgricultureTaskWhereInputObjectSchema.optional(), cursor: AgricultureTaskWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), AgricultureTaskCountAggregateInputObjectSchema ]).optional() }).strict();