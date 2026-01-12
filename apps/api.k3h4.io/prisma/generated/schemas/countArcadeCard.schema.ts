import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ArcadeCardOrderByWithRelationInputObjectSchema as ArcadeCardOrderByWithRelationInputObjectSchema } from './objects/ArcadeCardOrderByWithRelationInput.schema';
import { ArcadeCardWhereInputObjectSchema as ArcadeCardWhereInputObjectSchema } from './objects/ArcadeCardWhereInput.schema';
import { ArcadeCardWhereUniqueInputObjectSchema as ArcadeCardWhereUniqueInputObjectSchema } from './objects/ArcadeCardWhereUniqueInput.schema';
import { ArcadeCardCountAggregateInputObjectSchema as ArcadeCardCountAggregateInputObjectSchema } from './objects/ArcadeCardCountAggregateInput.schema';

export const ArcadeCardCountSchema: z.ZodType<Prisma.ArcadeCardCountArgs> = z.object({ orderBy: z.union([ArcadeCardOrderByWithRelationInputObjectSchema, ArcadeCardOrderByWithRelationInputObjectSchema.array()]).optional(), where: ArcadeCardWhereInputObjectSchema.optional(), cursor: ArcadeCardWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), ArcadeCardCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.ArcadeCardCountArgs>;

export const ArcadeCardCountZodSchema = z.object({ orderBy: z.union([ArcadeCardOrderByWithRelationInputObjectSchema, ArcadeCardOrderByWithRelationInputObjectSchema.array()]).optional(), where: ArcadeCardWhereInputObjectSchema.optional(), cursor: ArcadeCardWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), ArcadeCardCountAggregateInputObjectSchema ]).optional() }).strict();