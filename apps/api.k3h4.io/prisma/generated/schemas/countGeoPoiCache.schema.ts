import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoPoiCacheOrderByWithRelationInputObjectSchema as GeoPoiCacheOrderByWithRelationInputObjectSchema } from './objects/GeoPoiCacheOrderByWithRelationInput.schema';
import { GeoPoiCacheWhereInputObjectSchema as GeoPoiCacheWhereInputObjectSchema } from './objects/GeoPoiCacheWhereInput.schema';
import { GeoPoiCacheWhereUniqueInputObjectSchema as GeoPoiCacheWhereUniqueInputObjectSchema } from './objects/GeoPoiCacheWhereUniqueInput.schema';
import { GeoPoiCacheCountAggregateInputObjectSchema as GeoPoiCacheCountAggregateInputObjectSchema } from './objects/GeoPoiCacheCountAggregateInput.schema';

export const GeoPoiCacheCountSchema: z.ZodType<Prisma.GeoPoiCacheCountArgs> = z.object({ orderBy: z.union([GeoPoiCacheOrderByWithRelationInputObjectSchema, GeoPoiCacheOrderByWithRelationInputObjectSchema.array()]).optional(), where: GeoPoiCacheWhereInputObjectSchema.optional(), cursor: GeoPoiCacheWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), GeoPoiCacheCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.GeoPoiCacheCountArgs>;

export const GeoPoiCacheCountZodSchema = z.object({ orderBy: z.union([GeoPoiCacheOrderByWithRelationInputObjectSchema, GeoPoiCacheOrderByWithRelationInputObjectSchema.array()]).optional(), where: GeoPoiCacheWhereInputObjectSchema.optional(), cursor: GeoPoiCacheWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), GeoPoiCacheCountAggregateInputObjectSchema ]).optional() }).strict();