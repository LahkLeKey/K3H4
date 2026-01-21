import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PoiEnrichmentCacheOrderByWithRelationInputObjectSchema as PoiEnrichmentCacheOrderByWithRelationInputObjectSchema } from './objects/PoiEnrichmentCacheOrderByWithRelationInput.schema';
import { PoiEnrichmentCacheWhereInputObjectSchema as PoiEnrichmentCacheWhereInputObjectSchema } from './objects/PoiEnrichmentCacheWhereInput.schema';
import { PoiEnrichmentCacheWhereUniqueInputObjectSchema as PoiEnrichmentCacheWhereUniqueInputObjectSchema } from './objects/PoiEnrichmentCacheWhereUniqueInput.schema';
import { PoiEnrichmentCacheScalarFieldEnumSchema } from './enums/PoiEnrichmentCacheScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const PoiEnrichmentCacheFindFirstOrThrowSelectSchema: z.ZodType<Prisma.PoiEnrichmentCacheSelect> = z.object({
    id: z.boolean().optional(),
    includeHash: z.boolean().optional(),
    payload: z.boolean().optional(),
    fetchedAt: z.boolean().optional(),
    expiresAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.PoiEnrichmentCacheSelect>;

export const PoiEnrichmentCacheFindFirstOrThrowSelectZodSchema = z.object({
    id: z.boolean().optional(),
    includeHash: z.boolean().optional(),
    payload: z.boolean().optional(),
    fetchedAt: z.boolean().optional(),
    expiresAt: z.boolean().optional()
  }).strict();

export const PoiEnrichmentCacheFindFirstOrThrowSchema: z.ZodType<Prisma.PoiEnrichmentCacheFindFirstOrThrowArgs> = z.object({ select: PoiEnrichmentCacheFindFirstOrThrowSelectSchema.optional(),  orderBy: z.union([PoiEnrichmentCacheOrderByWithRelationInputObjectSchema, PoiEnrichmentCacheOrderByWithRelationInputObjectSchema.array()]).optional(), where: PoiEnrichmentCacheWhereInputObjectSchema.optional(), cursor: PoiEnrichmentCacheWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([PoiEnrichmentCacheScalarFieldEnumSchema, PoiEnrichmentCacheScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.PoiEnrichmentCacheFindFirstOrThrowArgs>;

export const PoiEnrichmentCacheFindFirstOrThrowZodSchema = z.object({ select: PoiEnrichmentCacheFindFirstOrThrowSelectSchema.optional(),  orderBy: z.union([PoiEnrichmentCacheOrderByWithRelationInputObjectSchema, PoiEnrichmentCacheOrderByWithRelationInputObjectSchema.array()]).optional(), where: PoiEnrichmentCacheWhereInputObjectSchema.optional(), cursor: PoiEnrichmentCacheWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([PoiEnrichmentCacheScalarFieldEnumSchema, PoiEnrichmentCacheScalarFieldEnumSchema.array()]).optional() }).strict();