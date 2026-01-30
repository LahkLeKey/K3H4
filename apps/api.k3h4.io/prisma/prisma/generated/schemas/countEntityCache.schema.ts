import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { EntityCacheOrderByWithRelationInputObjectSchema as EntityCacheOrderByWithRelationInputObjectSchema } from './objects/EntityCacheOrderByWithRelationInput.schema';
import { EntityCacheWhereInputObjectSchema as EntityCacheWhereInputObjectSchema } from './objects/EntityCacheWhereInput.schema';
import { EntityCacheWhereUniqueInputObjectSchema as EntityCacheWhereUniqueInputObjectSchema } from './objects/EntityCacheWhereUniqueInput.schema';
import { EntityCacheCountAggregateInputObjectSchema as EntityCacheCountAggregateInputObjectSchema } from './objects/EntityCacheCountAggregateInput.schema';

export const EntityCacheCountSchema: z.ZodType<Prisma.EntityCacheCountArgs> = z.object({ orderBy: z.union([EntityCacheOrderByWithRelationInputObjectSchema, EntityCacheOrderByWithRelationInputObjectSchema.array()]).optional(), where: EntityCacheWhereInputObjectSchema.optional(), cursor: EntityCacheWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), EntityCacheCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.EntityCacheCountArgs>;

export const EntityCacheCountZodSchema = z.object({ orderBy: z.union([EntityCacheOrderByWithRelationInputObjectSchema, EntityCacheOrderByWithRelationInputObjectSchema.array()]).optional(), where: EntityCacheWhereInputObjectSchema.optional(), cursor: EntityCacheWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), EntityCacheCountAggregateInputObjectSchema ]).optional() }).strict();