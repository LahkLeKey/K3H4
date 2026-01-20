import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { BuildingOrderByWithRelationInputObjectSchema as BuildingOrderByWithRelationInputObjectSchema } from './objects/BuildingOrderByWithRelationInput.schema';
import { BuildingWhereInputObjectSchema as BuildingWhereInputObjectSchema } from './objects/BuildingWhereInput.schema';
import { BuildingWhereUniqueInputObjectSchema as BuildingWhereUniqueInputObjectSchema } from './objects/BuildingWhereUniqueInput.schema';
import { BuildingCountAggregateInputObjectSchema as BuildingCountAggregateInputObjectSchema } from './objects/BuildingCountAggregateInput.schema';

export const BuildingCountSchema: z.ZodType<Prisma.BuildingCountArgs> = z.object({ orderBy: z.union([BuildingOrderByWithRelationInputObjectSchema, BuildingOrderByWithRelationInputObjectSchema.array()]).optional(), where: BuildingWhereInputObjectSchema.optional(), cursor: BuildingWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), BuildingCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.BuildingCountArgs>;

export const BuildingCountZodSchema = z.object({ orderBy: z.union([BuildingOrderByWithRelationInputObjectSchema, BuildingOrderByWithRelationInputObjectSchema.array()]).optional(), where: BuildingWhereInputObjectSchema.optional(), cursor: BuildingWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), BuildingCountAggregateInputObjectSchema ]).optional() }).strict();