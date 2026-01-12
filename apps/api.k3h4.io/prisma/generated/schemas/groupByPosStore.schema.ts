import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PosStoreWhereInputObjectSchema as PosStoreWhereInputObjectSchema } from './objects/PosStoreWhereInput.schema';
import { PosStoreOrderByWithAggregationInputObjectSchema as PosStoreOrderByWithAggregationInputObjectSchema } from './objects/PosStoreOrderByWithAggregationInput.schema';
import { PosStoreScalarWhereWithAggregatesInputObjectSchema as PosStoreScalarWhereWithAggregatesInputObjectSchema } from './objects/PosStoreScalarWhereWithAggregatesInput.schema';
import { PosStoreScalarFieldEnumSchema } from './enums/PosStoreScalarFieldEnum.schema';
import { PosStoreCountAggregateInputObjectSchema as PosStoreCountAggregateInputObjectSchema } from './objects/PosStoreCountAggregateInput.schema';
import { PosStoreMinAggregateInputObjectSchema as PosStoreMinAggregateInputObjectSchema } from './objects/PosStoreMinAggregateInput.schema';
import { PosStoreMaxAggregateInputObjectSchema as PosStoreMaxAggregateInputObjectSchema } from './objects/PosStoreMaxAggregateInput.schema';

export const PosStoreGroupBySchema: z.ZodType<Prisma.PosStoreGroupByArgs> = z.object({ where: PosStoreWhereInputObjectSchema.optional(), orderBy: z.union([PosStoreOrderByWithAggregationInputObjectSchema, PosStoreOrderByWithAggregationInputObjectSchema.array()]).optional(), having: PosStoreScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(PosStoreScalarFieldEnumSchema), _count: z.union([ z.literal(true), PosStoreCountAggregateInputObjectSchema ]).optional(), _min: PosStoreMinAggregateInputObjectSchema.optional(), _max: PosStoreMaxAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.PosStoreGroupByArgs>;

export const PosStoreGroupByZodSchema = z.object({ where: PosStoreWhereInputObjectSchema.optional(), orderBy: z.union([PosStoreOrderByWithAggregationInputObjectSchema, PosStoreOrderByWithAggregationInputObjectSchema.array()]).optional(), having: PosStoreScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(PosStoreScalarFieldEnumSchema), _count: z.union([ z.literal(true), PosStoreCountAggregateInputObjectSchema ]).optional(), _min: PosStoreMinAggregateInputObjectSchema.optional(), _max: PosStoreMaxAggregateInputObjectSchema.optional() }).strict();