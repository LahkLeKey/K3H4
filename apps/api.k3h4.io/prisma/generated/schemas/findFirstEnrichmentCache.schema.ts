import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { EnrichmentCacheOrderByWithRelationInputObjectSchema as EnrichmentCacheOrderByWithRelationInputObjectSchema } from './objects/EnrichmentCacheOrderByWithRelationInput.schema';
import { EnrichmentCacheWhereInputObjectSchema as EnrichmentCacheWhereInputObjectSchema } from './objects/EnrichmentCacheWhereInput.schema';
import { EnrichmentCacheWhereUniqueInputObjectSchema as EnrichmentCacheWhereUniqueInputObjectSchema } from './objects/EnrichmentCacheWhereUniqueInput.schema';
import { EnrichmentCacheScalarFieldEnumSchema } from './enums/EnrichmentCacheScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const EnrichmentCacheFindFirstSelectSchema: z.ZodType<Prisma.EnrichmentCacheSelect> = z.object({
    id: z.boolean().optional(),
    provider: z.boolean().optional(),
    namespace: z.boolean().optional(),
    kind: z.boolean().optional(),
    sourceKey: z.boolean().optional(),
    paramsHash: z.boolean().optional(),
    wikidataId: z.boolean().optional(),
    payload: z.boolean().optional(),
    status: z.boolean().optional(),
    fetchedAt: z.boolean().optional(),
    expiresAt: z.boolean().optional(),
    note: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.EnrichmentCacheSelect>;

export const EnrichmentCacheFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    provider: z.boolean().optional(),
    namespace: z.boolean().optional(),
    kind: z.boolean().optional(),
    sourceKey: z.boolean().optional(),
    paramsHash: z.boolean().optional(),
    wikidataId: z.boolean().optional(),
    payload: z.boolean().optional(),
    status: z.boolean().optional(),
    fetchedAt: z.boolean().optional(),
    expiresAt: z.boolean().optional(),
    note: z.boolean().optional()
  }).strict();

export const EnrichmentCacheFindFirstSchema: z.ZodType<Prisma.EnrichmentCacheFindFirstArgs> = z.object({ select: EnrichmentCacheFindFirstSelectSchema.optional(),  orderBy: z.union([EnrichmentCacheOrderByWithRelationInputObjectSchema, EnrichmentCacheOrderByWithRelationInputObjectSchema.array()]).optional(), where: EnrichmentCacheWhereInputObjectSchema.optional(), cursor: EnrichmentCacheWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([EnrichmentCacheScalarFieldEnumSchema, EnrichmentCacheScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.EnrichmentCacheFindFirstArgs>;

export const EnrichmentCacheFindFirstZodSchema = z.object({ select: EnrichmentCacheFindFirstSelectSchema.optional(),  orderBy: z.union([EnrichmentCacheOrderByWithRelationInputObjectSchema, EnrichmentCacheOrderByWithRelationInputObjectSchema.array()]).optional(), where: EnrichmentCacheWhereInputObjectSchema.optional(), cursor: EnrichmentCacheWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([EnrichmentCacheScalarFieldEnumSchema, EnrichmentCacheScalarFieldEnumSchema.array()]).optional() }).strict();