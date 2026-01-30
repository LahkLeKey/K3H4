import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoDemTileCacheIncludeObjectSchema as GeoDemTileCacheIncludeObjectSchema } from './objects/GeoDemTileCacheInclude.schema';
import { GeoDemTileCacheOrderByWithRelationInputObjectSchema as GeoDemTileCacheOrderByWithRelationInputObjectSchema } from './objects/GeoDemTileCacheOrderByWithRelationInput.schema';
import { GeoDemTileCacheWhereInputObjectSchema as GeoDemTileCacheWhereInputObjectSchema } from './objects/GeoDemTileCacheWhereInput.schema';
import { GeoDemTileCacheWhereUniqueInputObjectSchema as GeoDemTileCacheWhereUniqueInputObjectSchema } from './objects/GeoDemTileCacheWhereUniqueInput.schema';
import { GeoDemTileCacheScalarFieldEnumSchema } from './enums/GeoDemTileCacheScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const GeoDemTileCacheFindFirstSelectSchema: z.ZodType<Prisma.GeoDemTileCacheSelect> = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    provider: z.boolean().optional(),
    source: z.boolean().optional(),
    signature: z.boolean().optional(),
    z: z.boolean().optional(),
    x: z.boolean().optional(),
    y: z.boolean().optional(),
    format: z.boolean().optional(),
    url: z.boolean().optional(),
    data: z.boolean().optional(),
    byteLength: z.boolean().optional(),
    etag: z.boolean().optional(),
    cacheControl: z.boolean().optional(),
    expiresAt: z.boolean().optional(),
    fetchedAt: z.boolean().optional(),
    lastAccessed: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.GeoDemTileCacheSelect>;

export const GeoDemTileCacheFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    provider: z.boolean().optional(),
    source: z.boolean().optional(),
    signature: z.boolean().optional(),
    z: z.boolean().optional(),
    x: z.boolean().optional(),
    y: z.boolean().optional(),
    format: z.boolean().optional(),
    url: z.boolean().optional(),
    data: z.boolean().optional(),
    byteLength: z.boolean().optional(),
    etag: z.boolean().optional(),
    cacheControl: z.boolean().optional(),
    expiresAt: z.boolean().optional(),
    fetchedAt: z.boolean().optional(),
    lastAccessed: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict();

export const GeoDemTileCacheFindFirstSchema: z.ZodType<Prisma.GeoDemTileCacheFindFirstArgs> = z.object({ select: GeoDemTileCacheFindFirstSelectSchema.optional(), include: z.lazy(() => GeoDemTileCacheIncludeObjectSchema.optional()), orderBy: z.union([GeoDemTileCacheOrderByWithRelationInputObjectSchema, GeoDemTileCacheOrderByWithRelationInputObjectSchema.array()]).optional(), where: GeoDemTileCacheWhereInputObjectSchema.optional(), cursor: GeoDemTileCacheWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([GeoDemTileCacheScalarFieldEnumSchema, GeoDemTileCacheScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.GeoDemTileCacheFindFirstArgs>;

export const GeoDemTileCacheFindFirstZodSchema = z.object({ select: GeoDemTileCacheFindFirstSelectSchema.optional(), include: z.lazy(() => GeoDemTileCacheIncludeObjectSchema.optional()), orderBy: z.union([GeoDemTileCacheOrderByWithRelationInputObjectSchema, GeoDemTileCacheOrderByWithRelationInputObjectSchema.array()]).optional(), where: GeoDemTileCacheWhereInputObjectSchema.optional(), cursor: GeoDemTileCacheWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([GeoDemTileCacheScalarFieldEnumSchema, GeoDemTileCacheScalarFieldEnumSchema.array()]).optional() }).strict();