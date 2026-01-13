import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { FreightLoadOrderByWithRelationInputObjectSchema as FreightLoadOrderByWithRelationInputObjectSchema } from './objects/FreightLoadOrderByWithRelationInput.schema';
import { FreightLoadWhereInputObjectSchema as FreightLoadWhereInputObjectSchema } from './objects/FreightLoadWhereInput.schema';
import { FreightLoadWhereUniqueInputObjectSchema as FreightLoadWhereUniqueInputObjectSchema } from './objects/FreightLoadWhereUniqueInput.schema';
import { FreightLoadCountAggregateInputObjectSchema as FreightLoadCountAggregateInputObjectSchema } from './objects/FreightLoadCountAggregateInput.schema';

export const FreightLoadCountSchema: z.ZodType<Prisma.FreightLoadCountArgs> = z.object({ orderBy: z.union([FreightLoadOrderByWithRelationInputObjectSchema, FreightLoadOrderByWithRelationInputObjectSchema.array()]).optional(), where: FreightLoadWhereInputObjectSchema.optional(), cursor: FreightLoadWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), FreightLoadCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.FreightLoadCountArgs>;

export const FreightLoadCountZodSchema = z.object({ orderBy: z.union([FreightLoadOrderByWithRelationInputObjectSchema, FreightLoadOrderByWithRelationInputObjectSchema.array()]).optional(), where: FreightLoadWhereInputObjectSchema.optional(), cursor: FreightLoadWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), FreightLoadCountAggregateInputObjectSchema ]).optional() }).strict();