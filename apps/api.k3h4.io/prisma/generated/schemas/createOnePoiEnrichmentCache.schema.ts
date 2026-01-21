import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PoiEnrichmentCacheSelectObjectSchema as PoiEnrichmentCacheSelectObjectSchema } from './objects/PoiEnrichmentCacheSelect.schema';
import { PoiEnrichmentCacheCreateInputObjectSchema as PoiEnrichmentCacheCreateInputObjectSchema } from './objects/PoiEnrichmentCacheCreateInput.schema';
import { PoiEnrichmentCacheUncheckedCreateInputObjectSchema as PoiEnrichmentCacheUncheckedCreateInputObjectSchema } from './objects/PoiEnrichmentCacheUncheckedCreateInput.schema';

export const PoiEnrichmentCacheCreateOneSchema: z.ZodType<Prisma.PoiEnrichmentCacheCreateArgs> = z.object({ select: PoiEnrichmentCacheSelectObjectSchema.optional(),  data: z.union([PoiEnrichmentCacheCreateInputObjectSchema, PoiEnrichmentCacheUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.PoiEnrichmentCacheCreateArgs>;

export const PoiEnrichmentCacheCreateOneZodSchema = z.object({ select: PoiEnrichmentCacheSelectObjectSchema.optional(),  data: z.union([PoiEnrichmentCacheCreateInputObjectSchema, PoiEnrichmentCacheUncheckedCreateInputObjectSchema]) }).strict();