import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaSyncStateOrderByWithRelationInputObjectSchema as UsdaSyncStateOrderByWithRelationInputObjectSchema } from './objects/UsdaSyncStateOrderByWithRelationInput.schema';
import { UsdaSyncStateWhereInputObjectSchema as UsdaSyncStateWhereInputObjectSchema } from './objects/UsdaSyncStateWhereInput.schema';
import { UsdaSyncStateWhereUniqueInputObjectSchema as UsdaSyncStateWhereUniqueInputObjectSchema } from './objects/UsdaSyncStateWhereUniqueInput.schema';
import { UsdaSyncStateCountAggregateInputObjectSchema as UsdaSyncStateCountAggregateInputObjectSchema } from './objects/UsdaSyncStateCountAggregateInput.schema';

export const UsdaSyncStateCountSchema: z.ZodType<Prisma.UsdaSyncStateCountArgs> = z.object({ orderBy: z.union([UsdaSyncStateOrderByWithRelationInputObjectSchema, UsdaSyncStateOrderByWithRelationInputObjectSchema.array()]).optional(), where: UsdaSyncStateWhereInputObjectSchema.optional(), cursor: UsdaSyncStateWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), UsdaSyncStateCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.UsdaSyncStateCountArgs>;

export const UsdaSyncStateCountZodSchema = z.object({ orderBy: z.union([UsdaSyncStateOrderByWithRelationInputObjectSchema, UsdaSyncStateOrderByWithRelationInputObjectSchema.array()]).optional(), where: UsdaSyncStateWhereInputObjectSchema.optional(), cursor: UsdaSyncStateWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), UsdaSyncStateCountAggregateInputObjectSchema ]).optional() }).strict();