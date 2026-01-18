import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { OsrmCacheEntryOrderByWithRelationInputObjectSchema as OsrmCacheEntryOrderByWithRelationInputObjectSchema } from './objects/OsrmCacheEntryOrderByWithRelationInput.schema';
import { OsrmCacheEntryWhereInputObjectSchema as OsrmCacheEntryWhereInputObjectSchema } from './objects/OsrmCacheEntryWhereInput.schema';
import { OsrmCacheEntryWhereUniqueInputObjectSchema as OsrmCacheEntryWhereUniqueInputObjectSchema } from './objects/OsrmCacheEntryWhereUniqueInput.schema';
import { OsrmCacheEntryCountAggregateInputObjectSchema as OsrmCacheEntryCountAggregateInputObjectSchema } from './objects/OsrmCacheEntryCountAggregateInput.schema';

export const OsrmCacheEntryCountSchema: z.ZodType<Prisma.OsrmCacheEntryCountArgs> = z.object({ orderBy: z.union([OsrmCacheEntryOrderByWithRelationInputObjectSchema, OsrmCacheEntryOrderByWithRelationInputObjectSchema.array()]).optional(), where: OsrmCacheEntryWhereInputObjectSchema.optional(), cursor: OsrmCacheEntryWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), OsrmCacheEntryCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.OsrmCacheEntryCountArgs>;

export const OsrmCacheEntryCountZodSchema = z.object({ orderBy: z.union([OsrmCacheEntryOrderByWithRelationInputObjectSchema, OsrmCacheEntryOrderByWithRelationInputObjectSchema.array()]).optional(), where: OsrmCacheEntryWhereInputObjectSchema.optional(), cursor: OsrmCacheEntryWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), OsrmCacheEntryCountAggregateInputObjectSchema ]).optional() }).strict();