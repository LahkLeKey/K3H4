import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PoiEnrichmentCacheSelectObjectSchema as PoiEnrichmentCacheSelectObjectSchema } from './objects/PoiEnrichmentCacheSelect.schema';
import { PoiEnrichmentCacheCreateManyInputObjectSchema as PoiEnrichmentCacheCreateManyInputObjectSchema } from './objects/PoiEnrichmentCacheCreateManyInput.schema';

export const PoiEnrichmentCacheCreateManyAndReturnSchema: z.ZodType<Prisma.PoiEnrichmentCacheCreateManyAndReturnArgs> = z.object({ select: PoiEnrichmentCacheSelectObjectSchema.optional(), data: z.union([ PoiEnrichmentCacheCreateManyInputObjectSchema, z.array(PoiEnrichmentCacheCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.PoiEnrichmentCacheCreateManyAndReturnArgs>;

export const PoiEnrichmentCacheCreateManyAndReturnZodSchema = z.object({ select: PoiEnrichmentCacheSelectObjectSchema.optional(), data: z.union([ PoiEnrichmentCacheCreateManyInputObjectSchema, z.array(PoiEnrichmentCacheCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();