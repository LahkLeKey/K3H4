import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PosLineItemOrderByWithRelationInputObjectSchema as PosLineItemOrderByWithRelationInputObjectSchema } from './objects/PosLineItemOrderByWithRelationInput.schema';
import { PosLineItemWhereInputObjectSchema as PosLineItemWhereInputObjectSchema } from './objects/PosLineItemWhereInput.schema';
import { PosLineItemWhereUniqueInputObjectSchema as PosLineItemWhereUniqueInputObjectSchema } from './objects/PosLineItemWhereUniqueInput.schema';
import { PosLineItemCountAggregateInputObjectSchema as PosLineItemCountAggregateInputObjectSchema } from './objects/PosLineItemCountAggregateInput.schema';

export const PosLineItemCountSchema: z.ZodType<Prisma.PosLineItemCountArgs> = z.object({ orderBy: z.union([PosLineItemOrderByWithRelationInputObjectSchema, PosLineItemOrderByWithRelationInputObjectSchema.array()]).optional(), where: PosLineItemWhereInputObjectSchema.optional(), cursor: PosLineItemWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), PosLineItemCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.PosLineItemCountArgs>;

export const PosLineItemCountZodSchema = z.object({ orderBy: z.union([PosLineItemOrderByWithRelationInputObjectSchema, PosLineItemOrderByWithRelationInputObjectSchema.array()]).optional(), where: PosLineItemWhereInputObjectSchema.optional(), cursor: PosLineItemWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), PosLineItemCountAggregateInputObjectSchema ]).optional() }).strict();