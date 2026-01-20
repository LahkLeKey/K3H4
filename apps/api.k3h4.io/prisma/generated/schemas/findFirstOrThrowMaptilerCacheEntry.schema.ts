import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MaptilerCacheEntryIncludeObjectSchema as MaptilerCacheEntryIncludeObjectSchema } from './objects/MaptilerCacheEntryInclude.schema';
import { MaptilerCacheEntryOrderByWithRelationInputObjectSchema as MaptilerCacheEntryOrderByWithRelationInputObjectSchema } from './objects/MaptilerCacheEntryOrderByWithRelationInput.schema';
import { MaptilerCacheEntryWhereInputObjectSchema as MaptilerCacheEntryWhereInputObjectSchema } from './objects/MaptilerCacheEntryWhereInput.schema';
import { MaptilerCacheEntryWhereUniqueInputObjectSchema as MaptilerCacheEntryWhereUniqueInputObjectSchema } from './objects/MaptilerCacheEntryWhereUniqueInput.schema';
import { MaptilerCacheEntryScalarFieldEnumSchema } from './enums/MaptilerCacheEntryScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const MaptilerCacheEntryFindFirstOrThrowSelectSchema: z.ZodType<Prisma.MaptilerCacheEntrySelect> = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    queryId: z.boolean().optional(),
    query: z.boolean().optional(),
    kind: z.boolean().optional(),
    path: z.boolean().optional(),
    params: z.boolean().optional(),
    paramsHash: z.boolean().optional(),
    signature: z.boolean().optional(),
    method: z.boolean().optional(),
    responseType: z.boolean().optional(),
    url: z.boolean().optional(),
    statusCode: z.boolean().optional(),
    payload: z.boolean().optional(),
    data: z.boolean().optional(),
    contentType: z.boolean().optional(),
    cacheControl: z.boolean().optional(),
    fetchedAt: z.boolean().optional(),
    expiresAt: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.MaptilerCacheEntrySelect>;

export const MaptilerCacheEntryFindFirstOrThrowSelectZodSchema = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    queryId: z.boolean().optional(),
    query: z.boolean().optional(),
    kind: z.boolean().optional(),
    path: z.boolean().optional(),
    params: z.boolean().optional(),
    paramsHash: z.boolean().optional(),
    signature: z.boolean().optional(),
    method: z.boolean().optional(),
    responseType: z.boolean().optional(),
    url: z.boolean().optional(),
    statusCode: z.boolean().optional(),
    payload: z.boolean().optional(),
    data: z.boolean().optional(),
    contentType: z.boolean().optional(),
    cacheControl: z.boolean().optional(),
    fetchedAt: z.boolean().optional(),
    expiresAt: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict();

export const MaptilerCacheEntryFindFirstOrThrowSchema: z.ZodType<Prisma.MaptilerCacheEntryFindFirstOrThrowArgs> = z.object({ select: MaptilerCacheEntryFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => MaptilerCacheEntryIncludeObjectSchema.optional()), orderBy: z.union([MaptilerCacheEntryOrderByWithRelationInputObjectSchema, MaptilerCacheEntryOrderByWithRelationInputObjectSchema.array()]).optional(), where: MaptilerCacheEntryWhereInputObjectSchema.optional(), cursor: MaptilerCacheEntryWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([MaptilerCacheEntryScalarFieldEnumSchema, MaptilerCacheEntryScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.MaptilerCacheEntryFindFirstOrThrowArgs>;

export const MaptilerCacheEntryFindFirstOrThrowZodSchema = z.object({ select: MaptilerCacheEntryFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => MaptilerCacheEntryIncludeObjectSchema.optional()), orderBy: z.union([MaptilerCacheEntryOrderByWithRelationInputObjectSchema, MaptilerCacheEntryOrderByWithRelationInputObjectSchema.array()]).optional(), where: MaptilerCacheEntryWhereInputObjectSchema.optional(), cursor: MaptilerCacheEntryWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([MaptilerCacheEntryScalarFieldEnumSchema, MaptilerCacheEntryScalarFieldEnumSchema.array()]).optional() }).strict();