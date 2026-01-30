import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoStatusLogOrderByWithRelationInputObjectSchema as GeoStatusLogOrderByWithRelationInputObjectSchema } from './objects/GeoStatusLogOrderByWithRelationInput.schema';
import { GeoStatusLogWhereInputObjectSchema as GeoStatusLogWhereInputObjectSchema } from './objects/GeoStatusLogWhereInput.schema';
import { GeoStatusLogWhereUniqueInputObjectSchema as GeoStatusLogWhereUniqueInputObjectSchema } from './objects/GeoStatusLogWhereUniqueInput.schema';
import { GeoStatusLogCountAggregateInputObjectSchema as GeoStatusLogCountAggregateInputObjectSchema } from './objects/GeoStatusLogCountAggregateInput.schema';

export const GeoStatusLogCountSchema: z.ZodType<Prisma.GeoStatusLogCountArgs> = z.object({ orderBy: z.union([GeoStatusLogOrderByWithRelationInputObjectSchema, GeoStatusLogOrderByWithRelationInputObjectSchema.array()]).optional(), where: GeoStatusLogWhereInputObjectSchema.optional(), cursor: GeoStatusLogWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), GeoStatusLogCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.GeoStatusLogCountArgs>;

export const GeoStatusLogCountZodSchema = z.object({ orderBy: z.union([GeoStatusLogOrderByWithRelationInputObjectSchema, GeoStatusLogOrderByWithRelationInputObjectSchema.array()]).optional(), where: GeoStatusLogWhereInputObjectSchema.optional(), cursor: GeoStatusLogWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), GeoStatusLogCountAggregateInputObjectSchema ]).optional() }).strict();