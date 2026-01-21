import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PoiEnrichmentCacheUpdateManyMutationInputObjectSchema as PoiEnrichmentCacheUpdateManyMutationInputObjectSchema } from './objects/PoiEnrichmentCacheUpdateManyMutationInput.schema';
import { PoiEnrichmentCacheWhereInputObjectSchema as PoiEnrichmentCacheWhereInputObjectSchema } from './objects/PoiEnrichmentCacheWhereInput.schema';

export const PoiEnrichmentCacheUpdateManySchema: z.ZodType<Prisma.PoiEnrichmentCacheUpdateManyArgs> = z.object({ data: PoiEnrichmentCacheUpdateManyMutationInputObjectSchema, where: PoiEnrichmentCacheWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.PoiEnrichmentCacheUpdateManyArgs>;

export const PoiEnrichmentCacheUpdateManyZodSchema = z.object({ data: PoiEnrichmentCacheUpdateManyMutationInputObjectSchema, where: PoiEnrichmentCacheWhereInputObjectSchema.optional() }).strict();