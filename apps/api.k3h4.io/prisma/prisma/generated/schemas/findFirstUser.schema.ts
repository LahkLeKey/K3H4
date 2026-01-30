import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UserIncludeObjectSchema as UserIncludeObjectSchema } from './objects/UserInclude.schema';
import { UserOrderByWithRelationInputObjectSchema as UserOrderByWithRelationInputObjectSchema } from './objects/UserOrderByWithRelationInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './objects/UserWhereInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './objects/UserWhereUniqueInput.schema';
import { UserScalarFieldEnumSchema } from './enums/UserScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const UserFindFirstSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
    id: z.boolean().optional(),
    email: z.boolean().optional(),
    provider: z.boolean().optional(),
    providerId: z.boolean().optional(),
    k3h4CoinBalance: z.boolean().optional(),
    displayName: z.boolean().optional(),
    avatarUrl: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    refreshTokens: z.boolean().optional(),
    preference: z.boolean().optional(),
    telemetry: z.boolean().optional(),
    freightLoads: z.boolean().optional(),
    providerGrants: z.boolean().optional(),
    geoRouteCaches: z.boolean().optional(),
    geoDirections: z.boolean().optional(),
    geoPoiCaches: z.boolean().optional(),
    geoQueryCaches: z.boolean().optional(),
    maptilerQueries: z.boolean().optional(),
    maptilerCacheEntries: z.boolean().optional(),
    osrmCacheEntries: z.boolean().optional(),
    geoStatusLogs: z.boolean().optional(),
    geoDemTileCaches: z.boolean().optional(),
    geoViewHistories: z.boolean().optional(),
    chatSessions: z.boolean().optional(),
    aiInsights: z.boolean().optional(),
    ollamaOperations: z.boolean().optional(),
    actors: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.UserSelect>;

export const UserFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    email: z.boolean().optional(),
    provider: z.boolean().optional(),
    providerId: z.boolean().optional(),
    k3h4CoinBalance: z.boolean().optional(),
    displayName: z.boolean().optional(),
    avatarUrl: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    refreshTokens: z.boolean().optional(),
    preference: z.boolean().optional(),
    telemetry: z.boolean().optional(),
    freightLoads: z.boolean().optional(),
    providerGrants: z.boolean().optional(),
    geoRouteCaches: z.boolean().optional(),
    geoDirections: z.boolean().optional(),
    geoPoiCaches: z.boolean().optional(),
    geoQueryCaches: z.boolean().optional(),
    maptilerQueries: z.boolean().optional(),
    maptilerCacheEntries: z.boolean().optional(),
    osrmCacheEntries: z.boolean().optional(),
    geoStatusLogs: z.boolean().optional(),
    geoDemTileCaches: z.boolean().optional(),
    geoViewHistories: z.boolean().optional(),
    chatSessions: z.boolean().optional(),
    aiInsights: z.boolean().optional(),
    ollamaOperations: z.boolean().optional(),
    actors: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict();

export const UserFindFirstSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({ select: UserFindFirstSelectSchema.optional(), include: z.lazy(() => UserIncludeObjectSchema.optional()), orderBy: z.union([UserOrderByWithRelationInputObjectSchema, UserOrderByWithRelationInputObjectSchema.array()]).optional(), where: UserWhereInputObjectSchema.optional(), cursor: UserWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.UserFindFirstArgs>;

export const UserFindFirstZodSchema = z.object({ select: UserFindFirstSelectSchema.optional(), include: z.lazy(() => UserIncludeObjectSchema.optional()), orderBy: z.union([UserOrderByWithRelationInputObjectSchema, UserOrderByWithRelationInputObjectSchema.array()]).optional(), where: UserWhereInputObjectSchema.optional(), cursor: UserWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()]).optional() }).strict();