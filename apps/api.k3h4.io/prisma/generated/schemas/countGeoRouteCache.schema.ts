import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoRouteCacheOrderByWithRelationInputObjectSchema as GeoRouteCacheOrderByWithRelationInputObjectSchema } from './objects/GeoRouteCacheOrderByWithRelationInput.schema';
import { GeoRouteCacheWhereInputObjectSchema as GeoRouteCacheWhereInputObjectSchema } from './objects/GeoRouteCacheWhereInput.schema';
import { GeoRouteCacheWhereUniqueInputObjectSchema as GeoRouteCacheWhereUniqueInputObjectSchema } from './objects/GeoRouteCacheWhereUniqueInput.schema';
import { GeoRouteCacheCountAggregateInputObjectSchema as GeoRouteCacheCountAggregateInputObjectSchema } from './objects/GeoRouteCacheCountAggregateInput.schema';

export const GeoRouteCacheCountSchema: z.ZodType<Prisma.GeoRouteCacheCountArgs> = z.object({ orderBy: z.union([GeoRouteCacheOrderByWithRelationInputObjectSchema, GeoRouteCacheOrderByWithRelationInputObjectSchema.array()]).optional(), where: GeoRouteCacheWhereInputObjectSchema.optional(), cursor: GeoRouteCacheWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), GeoRouteCacheCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.GeoRouteCacheCountArgs>;

export const GeoRouteCacheCountZodSchema = z.object({ orderBy: z.union([GeoRouteCacheOrderByWithRelationInputObjectSchema, GeoRouteCacheOrderByWithRelationInputObjectSchema.array()]).optional(), where: GeoRouteCacheWhereInputObjectSchema.optional(), cursor: GeoRouteCacheWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), GeoRouteCacheCountAggregateInputObjectSchema ]).optional() }).strict();