import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PoiEnrichmentCacheOrderByWithRelationInputObjectSchema as PoiEnrichmentCacheOrderByWithRelationInputObjectSchema } from './objects/PoiEnrichmentCacheOrderByWithRelationInput.schema';
import { PoiEnrichmentCacheWhereInputObjectSchema as PoiEnrichmentCacheWhereInputObjectSchema } from './objects/PoiEnrichmentCacheWhereInput.schema';
import { PoiEnrichmentCacheWhereUniqueInputObjectSchema as PoiEnrichmentCacheWhereUniqueInputObjectSchema } from './objects/PoiEnrichmentCacheWhereUniqueInput.schema';
import { PoiEnrichmentCacheScalarFieldEnumSchema } from './enums/PoiEnrichmentCacheScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const PoiEnrichmentCacheFindManySelectSchema: z.ZodType<Prisma.PoiEnrichmentCacheSelect> = z.object({
    id: z.boolean().optional(),
    includeHash: z.boolean().optional(),
    payload: z.boolean().optional(),
    fetchedAt: z.boolean().optional(),
    expiresAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.PoiEnrichmentCacheSelect>;

export const PoiEnrichmentCacheFindManySelectZodSchema = z.object({
    id: z.boolean().optional(),
    includeHash: z.boolean().optional(),
    payload: z.boolean().optional(),
    fetchedAt: z.boolean().optional(),
    expiresAt: z.boolean().optional()
  }).strict();

export const PoiEnrichmentCacheFindManySchema: z.ZodType<Prisma.PoiEnrichmentCacheFindManyArgs> = z.object({ select: PoiEnrichmentCacheFindManySelectSchema.optional(),  orderBy: z.union([PoiEnrichmentCacheOrderByWithRelationInputObjectSchema, PoiEnrichmentCacheOrderByWithRelationInputObjectSchema.array()]).optional(), where: PoiEnrichmentCacheWhereInputObjectSchema.optional(), cursor: PoiEnrichmentCacheWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([PoiEnrichmentCacheScalarFieldEnumSchema, PoiEnrichmentCacheScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.PoiEnrichmentCacheFindManyArgs>;

export const PoiEnrichmentCacheFindManyZodSchema = z.object({ select: PoiEnrichmentCacheFindManySelectSchema.optional(),  orderBy: z.union([PoiEnrichmentCacheOrderByWithRelationInputObjectSchema, PoiEnrichmentCacheOrderByWithRelationInputObjectSchema.array()]).optional(), where: PoiEnrichmentCacheWhereInputObjectSchema.optional(), cursor: PoiEnrichmentCacheWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([PoiEnrichmentCacheScalarFieldEnumSchema, PoiEnrichmentCacheScalarFieldEnumSchema.array()]).optional() }).strict();