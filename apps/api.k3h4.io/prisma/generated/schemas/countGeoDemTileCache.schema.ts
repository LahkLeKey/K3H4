import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoDemTileCacheOrderByWithRelationInputObjectSchema as GeoDemTileCacheOrderByWithRelationInputObjectSchema } from './objects/GeoDemTileCacheOrderByWithRelationInput.schema';
import { GeoDemTileCacheWhereInputObjectSchema as GeoDemTileCacheWhereInputObjectSchema } from './objects/GeoDemTileCacheWhereInput.schema';
import { GeoDemTileCacheWhereUniqueInputObjectSchema as GeoDemTileCacheWhereUniqueInputObjectSchema } from './objects/GeoDemTileCacheWhereUniqueInput.schema';
import { GeoDemTileCacheCountAggregateInputObjectSchema as GeoDemTileCacheCountAggregateInputObjectSchema } from './objects/GeoDemTileCacheCountAggregateInput.schema';

export const GeoDemTileCacheCountSchema: z.ZodType<Prisma.GeoDemTileCacheCountArgs> = z.object({ orderBy: z.union([GeoDemTileCacheOrderByWithRelationInputObjectSchema, GeoDemTileCacheOrderByWithRelationInputObjectSchema.array()]).optional(), where: GeoDemTileCacheWhereInputObjectSchema.optional(), cursor: GeoDemTileCacheWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), GeoDemTileCacheCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.GeoDemTileCacheCountArgs>;

export const GeoDemTileCacheCountZodSchema = z.object({ orderBy: z.union([GeoDemTileCacheOrderByWithRelationInputObjectSchema, GeoDemTileCacheOrderByWithRelationInputObjectSchema.array()]).optional(), where: GeoDemTileCacheWhereInputObjectSchema.optional(), cursor: GeoDemTileCacheWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), GeoDemTileCacheCountAggregateInputObjectSchema ]).optional() }).strict();