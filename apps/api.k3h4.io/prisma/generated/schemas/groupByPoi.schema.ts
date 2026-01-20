import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PoiWhereInputObjectSchema as PoiWhereInputObjectSchema } from './objects/PoiWhereInput.schema';
import { PoiOrderByWithAggregationInputObjectSchema as PoiOrderByWithAggregationInputObjectSchema } from './objects/PoiOrderByWithAggregationInput.schema';
import { PoiScalarWhereWithAggregatesInputObjectSchema as PoiScalarWhereWithAggregatesInputObjectSchema } from './objects/PoiScalarWhereWithAggregatesInput.schema';
import { PoiScalarFieldEnumSchema } from './enums/PoiScalarFieldEnum.schema';
import { PoiCountAggregateInputObjectSchema as PoiCountAggregateInputObjectSchema } from './objects/PoiCountAggregateInput.schema';
import { PoiMinAggregateInputObjectSchema as PoiMinAggregateInputObjectSchema } from './objects/PoiMinAggregateInput.schema';
import { PoiMaxAggregateInputObjectSchema as PoiMaxAggregateInputObjectSchema } from './objects/PoiMaxAggregateInput.schema';
import { PoiAvgAggregateInputObjectSchema as PoiAvgAggregateInputObjectSchema } from './objects/PoiAvgAggregateInput.schema';
import { PoiSumAggregateInputObjectSchema as PoiSumAggregateInputObjectSchema } from './objects/PoiSumAggregateInput.schema';

export const PoiGroupBySchema: z.ZodType<Prisma.PoiGroupByArgs> = z.object({ where: PoiWhereInputObjectSchema.optional(), orderBy: z.union([PoiOrderByWithAggregationInputObjectSchema, PoiOrderByWithAggregationInputObjectSchema.array()]).optional(), having: PoiScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(PoiScalarFieldEnumSchema), _count: z.union([ z.literal(true), PoiCountAggregateInputObjectSchema ]).optional(), _min: PoiMinAggregateInputObjectSchema.optional(), _max: PoiMaxAggregateInputObjectSchema.optional(), _avg: PoiAvgAggregateInputObjectSchema.optional(), _sum: PoiSumAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.PoiGroupByArgs>;

export const PoiGroupByZodSchema = z.object({ where: PoiWhereInputObjectSchema.optional(), orderBy: z.union([PoiOrderByWithAggregationInputObjectSchema, PoiOrderByWithAggregationInputObjectSchema.array()]).optional(), having: PoiScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(PoiScalarFieldEnumSchema), _count: z.union([ z.literal(true), PoiCountAggregateInputObjectSchema ]).optional(), _min: PoiMinAggregateInputObjectSchema.optional(), _max: PoiMaxAggregateInputObjectSchema.optional(), _avg: PoiAvgAggregateInputObjectSchema.optional(), _sum: PoiSumAggregateInputObjectSchema.optional() }).strict();