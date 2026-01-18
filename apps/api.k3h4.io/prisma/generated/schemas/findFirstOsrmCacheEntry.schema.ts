import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { OsrmCacheEntryIncludeObjectSchema as OsrmCacheEntryIncludeObjectSchema } from './objects/OsrmCacheEntryInclude.schema';
import { OsrmCacheEntryOrderByWithRelationInputObjectSchema as OsrmCacheEntryOrderByWithRelationInputObjectSchema } from './objects/OsrmCacheEntryOrderByWithRelationInput.schema';
import { OsrmCacheEntryWhereInputObjectSchema as OsrmCacheEntryWhereInputObjectSchema } from './objects/OsrmCacheEntryWhereInput.schema';
import { OsrmCacheEntryWhereUniqueInputObjectSchema as OsrmCacheEntryWhereUniqueInputObjectSchema } from './objects/OsrmCacheEntryWhereUniqueInput.schema';
import { OsrmCacheEntryScalarFieldEnumSchema } from './enums/OsrmCacheEntryScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const OsrmCacheEntryFindFirstSelectSchema: z.ZodType<Prisma.OsrmCacheEntrySelect> = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    service: z.boolean().optional(),
    profile: z.boolean().optional(),
    coordinates: z.boolean().optional(),
    params: z.boolean().optional(),
    paramsHash: z.boolean().optional(),
    signature: z.boolean().optional(),
    url: z.boolean().optional(),
    statusCode: z.boolean().optional(),
    payload: z.boolean().optional(),
    fetchedAt: z.boolean().optional(),
    expiresAt: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.OsrmCacheEntrySelect>;

export const OsrmCacheEntryFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    service: z.boolean().optional(),
    profile: z.boolean().optional(),
    coordinates: z.boolean().optional(),
    params: z.boolean().optional(),
    paramsHash: z.boolean().optional(),
    signature: z.boolean().optional(),
    url: z.boolean().optional(),
    statusCode: z.boolean().optional(),
    payload: z.boolean().optional(),
    fetchedAt: z.boolean().optional(),
    expiresAt: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict();

export const OsrmCacheEntryFindFirstSchema: z.ZodType<Prisma.OsrmCacheEntryFindFirstArgs> = z.object({ select: OsrmCacheEntryFindFirstSelectSchema.optional(), include: z.lazy(() => OsrmCacheEntryIncludeObjectSchema.optional()), orderBy: z.union([OsrmCacheEntryOrderByWithRelationInputObjectSchema, OsrmCacheEntryOrderByWithRelationInputObjectSchema.array()]).optional(), where: OsrmCacheEntryWhereInputObjectSchema.optional(), cursor: OsrmCacheEntryWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([OsrmCacheEntryScalarFieldEnumSchema, OsrmCacheEntryScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.OsrmCacheEntryFindFirstArgs>;

export const OsrmCacheEntryFindFirstZodSchema = z.object({ select: OsrmCacheEntryFindFirstSelectSchema.optional(), include: z.lazy(() => OsrmCacheEntryIncludeObjectSchema.optional()), orderBy: z.union([OsrmCacheEntryOrderByWithRelationInputObjectSchema, OsrmCacheEntryOrderByWithRelationInputObjectSchema.array()]).optional(), where: OsrmCacheEntryWhereInputObjectSchema.optional(), cursor: OsrmCacheEntryWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([OsrmCacheEntryScalarFieldEnumSchema, OsrmCacheEntryScalarFieldEnumSchema.array()]).optional() }).strict();