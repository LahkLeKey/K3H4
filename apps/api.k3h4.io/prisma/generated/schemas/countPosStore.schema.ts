import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PosStoreOrderByWithRelationInputObjectSchema as PosStoreOrderByWithRelationInputObjectSchema } from './objects/PosStoreOrderByWithRelationInput.schema';
import { PosStoreWhereInputObjectSchema as PosStoreWhereInputObjectSchema } from './objects/PosStoreWhereInput.schema';
import { PosStoreWhereUniqueInputObjectSchema as PosStoreWhereUniqueInputObjectSchema } from './objects/PosStoreWhereUniqueInput.schema';
import { PosStoreCountAggregateInputObjectSchema as PosStoreCountAggregateInputObjectSchema } from './objects/PosStoreCountAggregateInput.schema';

export const PosStoreCountSchema: z.ZodType<Prisma.PosStoreCountArgs> = z.object({ orderBy: z.union([PosStoreOrderByWithRelationInputObjectSchema, PosStoreOrderByWithRelationInputObjectSchema.array()]).optional(), where: PosStoreWhereInputObjectSchema.optional(), cursor: PosStoreWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), PosStoreCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.PosStoreCountArgs>;

export const PosStoreCountZodSchema = z.object({ orderBy: z.union([PosStoreOrderByWithRelationInputObjectSchema, PosStoreOrderByWithRelationInputObjectSchema.array()]).optional(), where: PosStoreWhereInputObjectSchema.optional(), cursor: PosStoreWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), PosStoreCountAggregateInputObjectSchema ]).optional() }).strict();