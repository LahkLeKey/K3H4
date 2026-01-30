import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PoiOrderByWithRelationInputObjectSchema as PoiOrderByWithRelationInputObjectSchema } from './objects/PoiOrderByWithRelationInput.schema';
import { PoiWhereInputObjectSchema as PoiWhereInputObjectSchema } from './objects/PoiWhereInput.schema';
import { PoiWhereUniqueInputObjectSchema as PoiWhereUniqueInputObjectSchema } from './objects/PoiWhereUniqueInput.schema';
import { PoiCountAggregateInputObjectSchema as PoiCountAggregateInputObjectSchema } from './objects/PoiCountAggregateInput.schema';
import { PoiMinAggregateInputObjectSchema as PoiMinAggregateInputObjectSchema } from './objects/PoiMinAggregateInput.schema';
import { PoiMaxAggregateInputObjectSchema as PoiMaxAggregateInputObjectSchema } from './objects/PoiMaxAggregateInput.schema';
import { PoiAvgAggregateInputObjectSchema as PoiAvgAggregateInputObjectSchema } from './objects/PoiAvgAggregateInput.schema';
import { PoiSumAggregateInputObjectSchema as PoiSumAggregateInputObjectSchema } from './objects/PoiSumAggregateInput.schema';

export const PoiAggregateSchema: z.ZodType<Prisma.PoiAggregateArgs> = z.object({ orderBy: z.union([PoiOrderByWithRelationInputObjectSchema, PoiOrderByWithRelationInputObjectSchema.array()]).optional(), where: PoiWhereInputObjectSchema.optional(), cursor: PoiWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), PoiCountAggregateInputObjectSchema ]).optional(), _min: PoiMinAggregateInputObjectSchema.optional(), _max: PoiMaxAggregateInputObjectSchema.optional(), _avg: PoiAvgAggregateInputObjectSchema.optional(), _sum: PoiSumAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.PoiAggregateArgs>;

export const PoiAggregateZodSchema = z.object({ orderBy: z.union([PoiOrderByWithRelationInputObjectSchema, PoiOrderByWithRelationInputObjectSchema.array()]).optional(), where: PoiWhereInputObjectSchema.optional(), cursor: PoiWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), PoiCountAggregateInputObjectSchema ]).optional(), _min: PoiMinAggregateInputObjectSchema.optional(), _max: PoiMaxAggregateInputObjectSchema.optional(), _avg: PoiAvgAggregateInputObjectSchema.optional(), _sum: PoiSumAggregateInputObjectSchema.optional() }).strict();