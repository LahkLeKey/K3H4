import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ActorOrderByWithRelationInputObjectSchema as ActorOrderByWithRelationInputObjectSchema } from './objects/ActorOrderByWithRelationInput.schema';
import { ActorWhereInputObjectSchema as ActorWhereInputObjectSchema } from './objects/ActorWhereInput.schema';
import { ActorWhereUniqueInputObjectSchema as ActorWhereUniqueInputObjectSchema } from './objects/ActorWhereUniqueInput.schema';
import { ActorCountAggregateInputObjectSchema as ActorCountAggregateInputObjectSchema } from './objects/ActorCountAggregateInput.schema';

export const ActorCountSchema: z.ZodType<Prisma.ActorCountArgs> = z.object({ orderBy: z.union([ActorOrderByWithRelationInputObjectSchema, ActorOrderByWithRelationInputObjectSchema.array()]).optional(), where: ActorWhereInputObjectSchema.optional(), cursor: ActorWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), ActorCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.ActorCountArgs>;

export const ActorCountZodSchema = z.object({ orderBy: z.union([ActorOrderByWithRelationInputObjectSchema, ActorOrderByWithRelationInputObjectSchema.array()]).optional(), where: ActorWhereInputObjectSchema.optional(), cursor: ActorWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), ActorCountAggregateInputObjectSchema ]).optional() }).strict();