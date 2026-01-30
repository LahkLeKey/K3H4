import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PoiOrderByWithRelationInputObjectSchema as PoiOrderByWithRelationInputObjectSchema } from './objects/PoiOrderByWithRelationInput.schema';
import { PoiWhereInputObjectSchema as PoiWhereInputObjectSchema } from './objects/PoiWhereInput.schema';
import { PoiWhereUniqueInputObjectSchema as PoiWhereUniqueInputObjectSchema } from './objects/PoiWhereUniqueInput.schema';
import { PoiCountAggregateInputObjectSchema as PoiCountAggregateInputObjectSchema } from './objects/PoiCountAggregateInput.schema';

export const PoiCountSchema: z.ZodType<Prisma.PoiCountArgs> = z.object({ orderBy: z.union([PoiOrderByWithRelationInputObjectSchema, PoiOrderByWithRelationInputObjectSchema.array()]).optional(), where: PoiWhereInputObjectSchema.optional(), cursor: PoiWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), PoiCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.PoiCountArgs>;

export const PoiCountZodSchema = z.object({ orderBy: z.union([PoiOrderByWithRelationInputObjectSchema, PoiOrderByWithRelationInputObjectSchema.array()]).optional(), where: PoiWhereInputObjectSchema.optional(), cursor: PoiWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), PoiCountAggregateInputObjectSchema ]).optional() }).strict();