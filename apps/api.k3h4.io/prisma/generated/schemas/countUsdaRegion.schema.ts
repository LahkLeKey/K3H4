import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaRegionOrderByWithRelationInputObjectSchema as UsdaRegionOrderByWithRelationInputObjectSchema } from './objects/UsdaRegionOrderByWithRelationInput.schema';
import { UsdaRegionWhereInputObjectSchema as UsdaRegionWhereInputObjectSchema } from './objects/UsdaRegionWhereInput.schema';
import { UsdaRegionWhereUniqueInputObjectSchema as UsdaRegionWhereUniqueInputObjectSchema } from './objects/UsdaRegionWhereUniqueInput.schema';
import { UsdaRegionCountAggregateInputObjectSchema as UsdaRegionCountAggregateInputObjectSchema } from './objects/UsdaRegionCountAggregateInput.schema';

export const UsdaRegionCountSchema: z.ZodType<Prisma.UsdaRegionCountArgs> = z.object({ orderBy: z.union([UsdaRegionOrderByWithRelationInputObjectSchema, UsdaRegionOrderByWithRelationInputObjectSchema.array()]).optional(), where: UsdaRegionWhereInputObjectSchema.optional(), cursor: UsdaRegionWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), UsdaRegionCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.UsdaRegionCountArgs>;

export const UsdaRegionCountZodSchema = z.object({ orderBy: z.union([UsdaRegionOrderByWithRelationInputObjectSchema, UsdaRegionOrderByWithRelationInputObjectSchema.array()]).optional(), where: UsdaRegionWhereInputObjectSchema.optional(), cursor: UsdaRegionWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), UsdaRegionCountAggregateInputObjectSchema ]).optional() }).strict();