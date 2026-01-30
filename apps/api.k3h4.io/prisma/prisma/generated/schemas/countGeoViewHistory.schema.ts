import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoViewHistoryOrderByWithRelationInputObjectSchema as GeoViewHistoryOrderByWithRelationInputObjectSchema } from './objects/GeoViewHistoryOrderByWithRelationInput.schema';
import { GeoViewHistoryWhereInputObjectSchema as GeoViewHistoryWhereInputObjectSchema } from './objects/GeoViewHistoryWhereInput.schema';
import { GeoViewHistoryWhereUniqueInputObjectSchema as GeoViewHistoryWhereUniqueInputObjectSchema } from './objects/GeoViewHistoryWhereUniqueInput.schema';
import { GeoViewHistoryCountAggregateInputObjectSchema as GeoViewHistoryCountAggregateInputObjectSchema } from './objects/GeoViewHistoryCountAggregateInput.schema';

export const GeoViewHistoryCountSchema: z.ZodType<Prisma.GeoViewHistoryCountArgs> = z.object({ orderBy: z.union([GeoViewHistoryOrderByWithRelationInputObjectSchema, GeoViewHistoryOrderByWithRelationInputObjectSchema.array()]).optional(), where: GeoViewHistoryWhereInputObjectSchema.optional(), cursor: GeoViewHistoryWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), GeoViewHistoryCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.GeoViewHistoryCountArgs>;

export const GeoViewHistoryCountZodSchema = z.object({ orderBy: z.union([GeoViewHistoryOrderByWithRelationInputObjectSchema, GeoViewHistoryOrderByWithRelationInputObjectSchema.array()]).optional(), where: GeoViewHistoryWhereInputObjectSchema.optional(), cursor: GeoViewHistoryWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), GeoViewHistoryCountAggregateInputObjectSchema ]).optional() }).strict();