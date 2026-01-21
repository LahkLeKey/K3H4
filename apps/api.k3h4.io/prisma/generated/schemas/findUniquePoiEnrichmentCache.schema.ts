import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PoiEnrichmentCacheSelectObjectSchema as PoiEnrichmentCacheSelectObjectSchema } from './objects/PoiEnrichmentCacheSelect.schema';
import { PoiEnrichmentCacheWhereUniqueInputObjectSchema as PoiEnrichmentCacheWhereUniqueInputObjectSchema } from './objects/PoiEnrichmentCacheWhereUniqueInput.schema';

export const PoiEnrichmentCacheFindUniqueSchema: z.ZodType<Prisma.PoiEnrichmentCacheFindUniqueArgs> = z.object({ select: PoiEnrichmentCacheSelectObjectSchema.optional(),  where: PoiEnrichmentCacheWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.PoiEnrichmentCacheFindUniqueArgs>;

export const PoiEnrichmentCacheFindUniqueZodSchema = z.object({ select: PoiEnrichmentCacheSelectObjectSchema.optional(),  where: PoiEnrichmentCacheWhereUniqueInputObjectSchema }).strict();