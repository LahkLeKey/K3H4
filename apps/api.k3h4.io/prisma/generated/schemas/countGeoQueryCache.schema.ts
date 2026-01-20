import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoQueryCacheOrderByWithRelationInputObjectSchema as GeoQueryCacheOrderByWithRelationInputObjectSchema } from './objects/GeoQueryCacheOrderByWithRelationInput.schema';
import { GeoQueryCacheWhereInputObjectSchema as GeoQueryCacheWhereInputObjectSchema } from './objects/GeoQueryCacheWhereInput.schema';
import { GeoQueryCacheWhereUniqueInputObjectSchema as GeoQueryCacheWhereUniqueInputObjectSchema } from './objects/GeoQueryCacheWhereUniqueInput.schema';
import { GeoQueryCacheCountAggregateInputObjectSchema as GeoQueryCacheCountAggregateInputObjectSchema } from './objects/GeoQueryCacheCountAggregateInput.schema';

export const GeoQueryCacheCountSchema: z.ZodType<Prisma.GeoQueryCacheCountArgs> = z.object({ orderBy: z.union([GeoQueryCacheOrderByWithRelationInputObjectSchema, GeoQueryCacheOrderByWithRelationInputObjectSchema.array()]).optional(), where: GeoQueryCacheWhereInputObjectSchema.optional(), cursor: GeoQueryCacheWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), GeoQueryCacheCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.GeoQueryCacheCountArgs>;

export const GeoQueryCacheCountZodSchema = z.object({ orderBy: z.union([GeoQueryCacheOrderByWithRelationInputObjectSchema, GeoQueryCacheOrderByWithRelationInputObjectSchema.array()]).optional(), where: GeoQueryCacheWhereInputObjectSchema.optional(), cursor: GeoQueryCacheWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), GeoQueryCacheCountAggregateInputObjectSchema ]).optional() }).strict();