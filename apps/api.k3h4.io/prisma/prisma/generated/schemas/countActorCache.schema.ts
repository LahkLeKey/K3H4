import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ActorCacheOrderByWithRelationInputObjectSchema as ActorCacheOrderByWithRelationInputObjectSchema } from './objects/ActorCacheOrderByWithRelationInput.schema';
import { ActorCacheWhereInputObjectSchema as ActorCacheWhereInputObjectSchema } from './objects/ActorCacheWhereInput.schema';
import { ActorCacheWhereUniqueInputObjectSchema as ActorCacheWhereUniqueInputObjectSchema } from './objects/ActorCacheWhereUniqueInput.schema';
import { ActorCacheCountAggregateInputObjectSchema as ActorCacheCountAggregateInputObjectSchema } from './objects/ActorCacheCountAggregateInput.schema';

export const ActorCacheCountSchema: z.ZodType<Prisma.ActorCacheCountArgs> = z.object({ orderBy: z.union([ActorCacheOrderByWithRelationInputObjectSchema, ActorCacheOrderByWithRelationInputObjectSchema.array()]).optional(), where: ActorCacheWhereInputObjectSchema.optional(), cursor: ActorCacheWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), ActorCacheCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.ActorCacheCountArgs>;

export const ActorCacheCountZodSchema = z.object({ orderBy: z.union([ActorCacheOrderByWithRelationInputObjectSchema, ActorCacheOrderByWithRelationInputObjectSchema.array()]).optional(), where: ActorCacheWhereInputObjectSchema.optional(), cursor: ActorCacheWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), ActorCacheCountAggregateInputObjectSchema ]).optional() }).strict();