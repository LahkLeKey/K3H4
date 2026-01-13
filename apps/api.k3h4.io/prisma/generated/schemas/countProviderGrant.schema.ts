import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ProviderGrantOrderByWithRelationInputObjectSchema as ProviderGrantOrderByWithRelationInputObjectSchema } from './objects/ProviderGrantOrderByWithRelationInput.schema';
import { ProviderGrantWhereInputObjectSchema as ProviderGrantWhereInputObjectSchema } from './objects/ProviderGrantWhereInput.schema';
import { ProviderGrantWhereUniqueInputObjectSchema as ProviderGrantWhereUniqueInputObjectSchema } from './objects/ProviderGrantWhereUniqueInput.schema';
import { ProviderGrantCountAggregateInputObjectSchema as ProviderGrantCountAggregateInputObjectSchema } from './objects/ProviderGrantCountAggregateInput.schema';

export const ProviderGrantCountSchema: z.ZodType<Prisma.ProviderGrantCountArgs> = z.object({ orderBy: z.union([ProviderGrantOrderByWithRelationInputObjectSchema, ProviderGrantOrderByWithRelationInputObjectSchema.array()]).optional(), where: ProviderGrantWhereInputObjectSchema.optional(), cursor: ProviderGrantWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), ProviderGrantCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.ProviderGrantCountArgs>;

export const ProviderGrantCountZodSchema = z.object({ orderBy: z.union([ProviderGrantOrderByWithRelationInputObjectSchema, ProviderGrantOrderByWithRelationInputObjectSchema.array()]).optional(), where: ProviderGrantWhereInputObjectSchema.optional(), cursor: ProviderGrantWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), ProviderGrantCountAggregateInputObjectSchema ]).optional() }).strict();