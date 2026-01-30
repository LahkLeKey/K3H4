import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ApiCacheEntryOrderByWithRelationInputObjectSchema as ApiCacheEntryOrderByWithRelationInputObjectSchema } from './objects/ApiCacheEntryOrderByWithRelationInput.schema';
import { ApiCacheEntryWhereInputObjectSchema as ApiCacheEntryWhereInputObjectSchema } from './objects/ApiCacheEntryWhereInput.schema';
import { ApiCacheEntryWhereUniqueInputObjectSchema as ApiCacheEntryWhereUniqueInputObjectSchema } from './objects/ApiCacheEntryWhereUniqueInput.schema';
import { ApiCacheEntryCountAggregateInputObjectSchema as ApiCacheEntryCountAggregateInputObjectSchema } from './objects/ApiCacheEntryCountAggregateInput.schema';

export const ApiCacheEntryCountSchema: z.ZodType<Prisma.ApiCacheEntryCountArgs> = z.object({ orderBy: z.union([ApiCacheEntryOrderByWithRelationInputObjectSchema, ApiCacheEntryOrderByWithRelationInputObjectSchema.array()]).optional(), where: ApiCacheEntryWhereInputObjectSchema.optional(), cursor: ApiCacheEntryWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), ApiCacheEntryCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.ApiCacheEntryCountArgs>;

export const ApiCacheEntryCountZodSchema = z.object({ orderBy: z.union([ApiCacheEntryOrderByWithRelationInputObjectSchema, ApiCacheEntryOrderByWithRelationInputObjectSchema.array()]).optional(), where: ApiCacheEntryWhereInputObjectSchema.optional(), cursor: ApiCacheEntryWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), ApiCacheEntryCountAggregateInputObjectSchema ]).optional() }).strict();