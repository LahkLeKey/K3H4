import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ActorOrderByWithRelationInputObjectSchema as ActorOrderByWithRelationInputObjectSchema } from './objects/ActorOrderByWithRelationInput.schema';
import { ActorWhereInputObjectSchema as ActorWhereInputObjectSchema } from './objects/ActorWhereInput.schema';
import { ActorWhereUniqueInputObjectSchema as ActorWhereUniqueInputObjectSchema } from './objects/ActorWhereUniqueInput.schema';
import { ActorCountAggregateInputObjectSchema as ActorCountAggregateInputObjectSchema } from './objects/ActorCountAggregateInput.schema';
import { ActorMinAggregateInputObjectSchema as ActorMinAggregateInputObjectSchema } from './objects/ActorMinAggregateInput.schema';
import { ActorMaxAggregateInputObjectSchema as ActorMaxAggregateInputObjectSchema } from './objects/ActorMaxAggregateInput.schema';
import { ActorAvgAggregateInputObjectSchema as ActorAvgAggregateInputObjectSchema } from './objects/ActorAvgAggregateInput.schema';
import { ActorSumAggregateInputObjectSchema as ActorSumAggregateInputObjectSchema } from './objects/ActorSumAggregateInput.schema';

export const ActorAggregateSchema: z.ZodType<Prisma.ActorAggregateArgs> = z.object({ orderBy: z.union([ActorOrderByWithRelationInputObjectSchema, ActorOrderByWithRelationInputObjectSchema.array()]).optional(), where: ActorWhereInputObjectSchema.optional(), cursor: ActorWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), ActorCountAggregateInputObjectSchema ]).optional(), _min: ActorMinAggregateInputObjectSchema.optional(), _max: ActorMaxAggregateInputObjectSchema.optional(), _avg: ActorAvgAggregateInputObjectSchema.optional(), _sum: ActorSumAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ActorAggregateArgs>;

export const ActorAggregateZodSchema = z.object({ orderBy: z.union([ActorOrderByWithRelationInputObjectSchema, ActorOrderByWithRelationInputObjectSchema.array()]).optional(), where: ActorWhereInputObjectSchema.optional(), cursor: ActorWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), ActorCountAggregateInputObjectSchema ]).optional(), _min: ActorMinAggregateInputObjectSchema.optional(), _max: ActorMaxAggregateInputObjectSchema.optional(), _avg: ActorAvgAggregateInputObjectSchema.optional(), _sum: ActorSumAggregateInputObjectSchema.optional() }).strict();