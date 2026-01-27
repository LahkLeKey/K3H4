import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoDirectionOrderByWithRelationInputObjectSchema as GeoDirectionOrderByWithRelationInputObjectSchema } from './objects/GeoDirectionOrderByWithRelationInput.schema';
import { GeoDirectionWhereInputObjectSchema as GeoDirectionWhereInputObjectSchema } from './objects/GeoDirectionWhereInput.schema';
import { GeoDirectionWhereUniqueInputObjectSchema as GeoDirectionWhereUniqueInputObjectSchema } from './objects/GeoDirectionWhereUniqueInput.schema';
import { GeoDirectionCountAggregateInputObjectSchema as GeoDirectionCountAggregateInputObjectSchema } from './objects/GeoDirectionCountAggregateInput.schema';

export const GeoDirectionCountSchema: z.ZodType<Prisma.GeoDirectionCountArgs> = z.object({ orderBy: z.union([GeoDirectionOrderByWithRelationInputObjectSchema, GeoDirectionOrderByWithRelationInputObjectSchema.array()]).optional(), where: GeoDirectionWhereInputObjectSchema.optional(), cursor: GeoDirectionWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), GeoDirectionCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.GeoDirectionCountArgs>;

export const GeoDirectionCountZodSchema = z.object({ orderBy: z.union([GeoDirectionOrderByWithRelationInputObjectSchema, GeoDirectionOrderByWithRelationInputObjectSchema.array()]).optional(), where: GeoDirectionWhereInputObjectSchema.optional(), cursor: GeoDirectionWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), GeoDirectionCountAggregateInputObjectSchema ]).optional() }).strict();