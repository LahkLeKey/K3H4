import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PosStoreOrderByWithRelationInputObjectSchema as PosStoreOrderByWithRelationInputObjectSchema } from './objects/PosStoreOrderByWithRelationInput.schema';
import { PosStoreWhereInputObjectSchema as PosStoreWhereInputObjectSchema } from './objects/PosStoreWhereInput.schema';
import { PosStoreWhereUniqueInputObjectSchema as PosStoreWhereUniqueInputObjectSchema } from './objects/PosStoreWhereUniqueInput.schema';
import { PosStoreCountAggregateInputObjectSchema as PosStoreCountAggregateInputObjectSchema } from './objects/PosStoreCountAggregateInput.schema';
import { PosStoreMinAggregateInputObjectSchema as PosStoreMinAggregateInputObjectSchema } from './objects/PosStoreMinAggregateInput.schema';
import { PosStoreMaxAggregateInputObjectSchema as PosStoreMaxAggregateInputObjectSchema } from './objects/PosStoreMaxAggregateInput.schema';

export const PosStoreAggregateSchema: z.ZodType<Prisma.PosStoreAggregateArgs> = z.object({ orderBy: z.union([PosStoreOrderByWithRelationInputObjectSchema, PosStoreOrderByWithRelationInputObjectSchema.array()]).optional(), where: PosStoreWhereInputObjectSchema.optional(), cursor: PosStoreWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), PosStoreCountAggregateInputObjectSchema ]).optional(), _min: PosStoreMinAggregateInputObjectSchema.optional(), _max: PosStoreMaxAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.PosStoreAggregateArgs>;

export const PosStoreAggregateZodSchema = z.object({ orderBy: z.union([PosStoreOrderByWithRelationInputObjectSchema, PosStoreOrderByWithRelationInputObjectSchema.array()]).optional(), where: PosStoreWhereInputObjectSchema.optional(), cursor: PosStoreWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), PosStoreCountAggregateInputObjectSchema ]).optional(), _min: PosStoreMinAggregateInputObjectSchema.optional(), _max: PosStoreMaxAggregateInputObjectSchema.optional() }).strict();