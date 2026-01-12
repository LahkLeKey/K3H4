import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaCacheEntryOrderByWithRelationInputObjectSchema as UsdaCacheEntryOrderByWithRelationInputObjectSchema } from './objects/UsdaCacheEntryOrderByWithRelationInput.schema';
import { UsdaCacheEntryWhereInputObjectSchema as UsdaCacheEntryWhereInputObjectSchema } from './objects/UsdaCacheEntryWhereInput.schema';
import { UsdaCacheEntryWhereUniqueInputObjectSchema as UsdaCacheEntryWhereUniqueInputObjectSchema } from './objects/UsdaCacheEntryWhereUniqueInput.schema';
import { UsdaCacheEntryCountAggregateInputObjectSchema as UsdaCacheEntryCountAggregateInputObjectSchema } from './objects/UsdaCacheEntryCountAggregateInput.schema';

export const UsdaCacheEntryCountSchema: z.ZodType<Prisma.UsdaCacheEntryCountArgs> = z.object({ orderBy: z.union([UsdaCacheEntryOrderByWithRelationInputObjectSchema, UsdaCacheEntryOrderByWithRelationInputObjectSchema.array()]).optional(), where: UsdaCacheEntryWhereInputObjectSchema.optional(), cursor: UsdaCacheEntryWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), UsdaCacheEntryCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.UsdaCacheEntryCountArgs>;

export const UsdaCacheEntryCountZodSchema = z.object({ orderBy: z.union([UsdaCacheEntryOrderByWithRelationInputObjectSchema, UsdaCacheEntryOrderByWithRelationInputObjectSchema.array()]).optional(), where: UsdaCacheEntryWhereInputObjectSchema.optional(), cursor: UsdaCacheEntryWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), UsdaCacheEntryCountAggregateInputObjectSchema ]).optional() }).strict();