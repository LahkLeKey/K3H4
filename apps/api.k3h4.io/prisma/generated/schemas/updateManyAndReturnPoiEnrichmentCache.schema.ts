import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PoiEnrichmentCacheSelectObjectSchema as PoiEnrichmentCacheSelectObjectSchema } from './objects/PoiEnrichmentCacheSelect.schema';
import { PoiEnrichmentCacheUpdateManyMutationInputObjectSchema as PoiEnrichmentCacheUpdateManyMutationInputObjectSchema } from './objects/PoiEnrichmentCacheUpdateManyMutationInput.schema';
import { PoiEnrichmentCacheWhereInputObjectSchema as PoiEnrichmentCacheWhereInputObjectSchema } from './objects/PoiEnrichmentCacheWhereInput.schema';

export const PoiEnrichmentCacheUpdateManyAndReturnSchema: z.ZodType<Prisma.PoiEnrichmentCacheUpdateManyAndReturnArgs> = z.object({ select: PoiEnrichmentCacheSelectObjectSchema.optional(), data: PoiEnrichmentCacheUpdateManyMutationInputObjectSchema, where: PoiEnrichmentCacheWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.PoiEnrichmentCacheUpdateManyAndReturnArgs>;

export const PoiEnrichmentCacheUpdateManyAndReturnZodSchema = z.object({ select: PoiEnrichmentCacheSelectObjectSchema.optional(), data: PoiEnrichmentCacheUpdateManyMutationInputObjectSchema, where: PoiEnrichmentCacheWhereInputObjectSchema.optional() }).strict();