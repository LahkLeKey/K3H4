import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { WarehouseItemOrderByWithRelationInputObjectSchema as WarehouseItemOrderByWithRelationInputObjectSchema } from './objects/WarehouseItemOrderByWithRelationInput.schema';
import { WarehouseItemWhereInputObjectSchema as WarehouseItemWhereInputObjectSchema } from './objects/WarehouseItemWhereInput.schema';
import { WarehouseItemWhereUniqueInputObjectSchema as WarehouseItemWhereUniqueInputObjectSchema } from './objects/WarehouseItemWhereUniqueInput.schema';
import { WarehouseItemCountAggregateInputObjectSchema as WarehouseItemCountAggregateInputObjectSchema } from './objects/WarehouseItemCountAggregateInput.schema';

export const WarehouseItemCountSchema: z.ZodType<Prisma.WarehouseItemCountArgs> = z.object({ orderBy: z.union([WarehouseItemOrderByWithRelationInputObjectSchema, WarehouseItemOrderByWithRelationInputObjectSchema.array()]).optional(), where: WarehouseItemWhereInputObjectSchema.optional(), cursor: WarehouseItemWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), WarehouseItemCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.WarehouseItemCountArgs>;

export const WarehouseItemCountZodSchema = z.object({ orderBy: z.union([WarehouseItemOrderByWithRelationInputObjectSchema, WarehouseItemOrderByWithRelationInputObjectSchema.array()]).optional(), where: WarehouseItemWhereInputObjectSchema.optional(), cursor: WarehouseItemWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), WarehouseItemCountAggregateInputObjectSchema ]).optional() }).strict();