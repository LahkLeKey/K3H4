import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ArcadePrizeOrderByWithRelationInputObjectSchema as ArcadePrizeOrderByWithRelationInputObjectSchema } from './objects/ArcadePrizeOrderByWithRelationInput.schema';
import { ArcadePrizeWhereInputObjectSchema as ArcadePrizeWhereInputObjectSchema } from './objects/ArcadePrizeWhereInput.schema';
import { ArcadePrizeWhereUniqueInputObjectSchema as ArcadePrizeWhereUniqueInputObjectSchema } from './objects/ArcadePrizeWhereUniqueInput.schema';
import { ArcadePrizeCountAggregateInputObjectSchema as ArcadePrizeCountAggregateInputObjectSchema } from './objects/ArcadePrizeCountAggregateInput.schema';

export const ArcadePrizeCountSchema: z.ZodType<Prisma.ArcadePrizeCountArgs> = z.object({ orderBy: z.union([ArcadePrizeOrderByWithRelationInputObjectSchema, ArcadePrizeOrderByWithRelationInputObjectSchema.array()]).optional(), where: ArcadePrizeWhereInputObjectSchema.optional(), cursor: ArcadePrizeWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), ArcadePrizeCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.ArcadePrizeCountArgs>;

export const ArcadePrizeCountZodSchema = z.object({ orderBy: z.union([ArcadePrizeOrderByWithRelationInputObjectSchema, ArcadePrizeOrderByWithRelationInputObjectSchema.array()]).optional(), where: ArcadePrizeWhereInputObjectSchema.optional(), cursor: ArcadePrizeWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), ArcadePrizeCountAggregateInputObjectSchema ]).optional() }).strict();