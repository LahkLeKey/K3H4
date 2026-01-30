import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ApiCacheEntryOrderByWithRelationInputObjectSchema as ApiCacheEntryOrderByWithRelationInputObjectSchema } from './objects/ApiCacheEntryOrderByWithRelationInput.schema';
import { ApiCacheEntryWhereInputObjectSchema as ApiCacheEntryWhereInputObjectSchema } from './objects/ApiCacheEntryWhereInput.schema';
import { ApiCacheEntryWhereUniqueInputObjectSchema as ApiCacheEntryWhereUniqueInputObjectSchema } from './objects/ApiCacheEntryWhereUniqueInput.schema';
import { ApiCacheEntryScalarFieldEnumSchema } from './enums/ApiCacheEntryScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ApiCacheEntryFindFirstSelectSchema: z.ZodType<Prisma.ApiCacheEntrySelect> = z.object({
    id: z.boolean().optional(),
    provider: z.boolean().optional(),
    scope: z.boolean().optional(),
    endpoint: z.boolean().optional(),
    params: z.boolean().optional(),
    paramsHash: z.boolean().optional(),
    payload: z.boolean().optional(),
    fetchedAt: z.boolean().optional(),
    expiresAt: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.ApiCacheEntrySelect>;

export const ApiCacheEntryFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    provider: z.boolean().optional(),
    scope: z.boolean().optional(),
    endpoint: z.boolean().optional(),
    params: z.boolean().optional(),
    paramsHash: z.boolean().optional(),
    payload: z.boolean().optional(),
    fetchedAt: z.boolean().optional(),
    expiresAt: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict();

export const ApiCacheEntryFindFirstSchema: z.ZodType<Prisma.ApiCacheEntryFindFirstArgs> = z.object({ select: ApiCacheEntryFindFirstSelectSchema.optional(),  orderBy: z.union([ApiCacheEntryOrderByWithRelationInputObjectSchema, ApiCacheEntryOrderByWithRelationInputObjectSchema.array()]).optional(), where: ApiCacheEntryWhereInputObjectSchema.optional(), cursor: ApiCacheEntryWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ApiCacheEntryScalarFieldEnumSchema, ApiCacheEntryScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.ApiCacheEntryFindFirstArgs>;

export const ApiCacheEntryFindFirstZodSchema = z.object({ select: ApiCacheEntryFindFirstSelectSchema.optional(),  orderBy: z.union([ApiCacheEntryOrderByWithRelationInputObjectSchema, ApiCacheEntryOrderByWithRelationInputObjectSchema.array()]).optional(), where: ApiCacheEntryWhereInputObjectSchema.optional(), cursor: ApiCacheEntryWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ApiCacheEntryScalarFieldEnumSchema, ApiCacheEntryScalarFieldEnumSchema.array()]).optional() }).strict();