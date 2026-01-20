import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { WikidataCacheEntryOrderByWithRelationInputObjectSchema as WikidataCacheEntryOrderByWithRelationInputObjectSchema } from './objects/WikidataCacheEntryOrderByWithRelationInput.schema';
import { WikidataCacheEntryWhereInputObjectSchema as WikidataCacheEntryWhereInputObjectSchema } from './objects/WikidataCacheEntryWhereInput.schema';
import { WikidataCacheEntryWhereUniqueInputObjectSchema as WikidataCacheEntryWhereUniqueInputObjectSchema } from './objects/WikidataCacheEntryWhereUniqueInput.schema';
import { WikidataCacheEntryScalarFieldEnumSchema } from './enums/WikidataCacheEntryScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const WikidataCacheEntryFindFirstSelectSchema: z.ZodType<Prisma.WikidataCacheEntrySelect> = z.object({
    id: z.boolean().optional(),
    resource: z.boolean().optional(),
    endpoint: z.boolean().optional(),
    params: z.boolean().optional(),
    paramsHash: z.boolean().optional(),
    url: z.boolean().optional(),
    statusCode: z.boolean().optional(),
    payload: z.boolean().optional(),
    fetchedAt: z.boolean().optional(),
    expiresAt: z.boolean().optional(),
    cacheControlSeconds: z.boolean().optional(),
    etag: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.WikidataCacheEntrySelect>;

export const WikidataCacheEntryFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    resource: z.boolean().optional(),
    endpoint: z.boolean().optional(),
    params: z.boolean().optional(),
    paramsHash: z.boolean().optional(),
    url: z.boolean().optional(),
    statusCode: z.boolean().optional(),
    payload: z.boolean().optional(),
    fetchedAt: z.boolean().optional(),
    expiresAt: z.boolean().optional(),
    cacheControlSeconds: z.boolean().optional(),
    etag: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict();

export const WikidataCacheEntryFindFirstSchema: z.ZodType<Prisma.WikidataCacheEntryFindFirstArgs> = z.object({ select: WikidataCacheEntryFindFirstSelectSchema.optional(),  orderBy: z.union([WikidataCacheEntryOrderByWithRelationInputObjectSchema, WikidataCacheEntryOrderByWithRelationInputObjectSchema.array()]).optional(), where: WikidataCacheEntryWhereInputObjectSchema.optional(), cursor: WikidataCacheEntryWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([WikidataCacheEntryScalarFieldEnumSchema, WikidataCacheEntryScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.WikidataCacheEntryFindFirstArgs>;

export const WikidataCacheEntryFindFirstZodSchema = z.object({ select: WikidataCacheEntryFindFirstSelectSchema.optional(),  orderBy: z.union([WikidataCacheEntryOrderByWithRelationInputObjectSchema, WikidataCacheEntryOrderByWithRelationInputObjectSchema.array()]).optional(), where: WikidataCacheEntryWhereInputObjectSchema.optional(), cursor: WikidataCacheEntryWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([WikidataCacheEntryScalarFieldEnumSchema, WikidataCacheEntryScalarFieldEnumSchema.array()]).optional() }).strict();