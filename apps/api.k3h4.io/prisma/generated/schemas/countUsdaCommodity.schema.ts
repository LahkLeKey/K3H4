import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaCommodityOrderByWithRelationInputObjectSchema as UsdaCommodityOrderByWithRelationInputObjectSchema } from './objects/UsdaCommodityOrderByWithRelationInput.schema';
import { UsdaCommodityWhereInputObjectSchema as UsdaCommodityWhereInputObjectSchema } from './objects/UsdaCommodityWhereInput.schema';
import { UsdaCommodityWhereUniqueInputObjectSchema as UsdaCommodityWhereUniqueInputObjectSchema } from './objects/UsdaCommodityWhereUniqueInput.schema';
import { UsdaCommodityCountAggregateInputObjectSchema as UsdaCommodityCountAggregateInputObjectSchema } from './objects/UsdaCommodityCountAggregateInput.schema';

export const UsdaCommodityCountSchema: z.ZodType<Prisma.UsdaCommodityCountArgs> = z.object({ orderBy: z.union([UsdaCommodityOrderByWithRelationInputObjectSchema, UsdaCommodityOrderByWithRelationInputObjectSchema.array()]).optional(), where: UsdaCommodityWhereInputObjectSchema.optional(), cursor: UsdaCommodityWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), UsdaCommodityCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.UsdaCommodityCountArgs>;

export const UsdaCommodityCountZodSchema = z.object({ orderBy: z.union([UsdaCommodityOrderByWithRelationInputObjectSchema, UsdaCommodityOrderByWithRelationInputObjectSchema.array()]).optional(), where: UsdaCommodityWhereInputObjectSchema.optional(), cursor: UsdaCommodityWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), UsdaCommodityCountAggregateInputObjectSchema ]).optional() }).strict();