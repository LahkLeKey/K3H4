import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PoiEnrichmentCacheCreateManyInputObjectSchema as PoiEnrichmentCacheCreateManyInputObjectSchema } from './objects/PoiEnrichmentCacheCreateManyInput.schema';

export const PoiEnrichmentCacheCreateManySchema: z.ZodType<Prisma.PoiEnrichmentCacheCreateManyArgs> = z.object({ data: z.union([ PoiEnrichmentCacheCreateManyInputObjectSchema, z.array(PoiEnrichmentCacheCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.PoiEnrichmentCacheCreateManyArgs>;

export const PoiEnrichmentCacheCreateManyZodSchema = z.object({ data: z.union([ PoiEnrichmentCacheCreateManyInputObjectSchema, z.array(PoiEnrichmentCacheCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();