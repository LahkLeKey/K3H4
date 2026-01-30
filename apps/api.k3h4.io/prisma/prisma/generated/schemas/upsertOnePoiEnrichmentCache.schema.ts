import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PoiEnrichmentCacheSelectObjectSchema as PoiEnrichmentCacheSelectObjectSchema } from './objects/PoiEnrichmentCacheSelect.schema';
import { PoiEnrichmentCacheWhereUniqueInputObjectSchema as PoiEnrichmentCacheWhereUniqueInputObjectSchema } from './objects/PoiEnrichmentCacheWhereUniqueInput.schema';
import { PoiEnrichmentCacheCreateInputObjectSchema as PoiEnrichmentCacheCreateInputObjectSchema } from './objects/PoiEnrichmentCacheCreateInput.schema';
import { PoiEnrichmentCacheUncheckedCreateInputObjectSchema as PoiEnrichmentCacheUncheckedCreateInputObjectSchema } from './objects/PoiEnrichmentCacheUncheckedCreateInput.schema';
import { PoiEnrichmentCacheUpdateInputObjectSchema as PoiEnrichmentCacheUpdateInputObjectSchema } from './objects/PoiEnrichmentCacheUpdateInput.schema';
import { PoiEnrichmentCacheUncheckedUpdateInputObjectSchema as PoiEnrichmentCacheUncheckedUpdateInputObjectSchema } from './objects/PoiEnrichmentCacheUncheckedUpdateInput.schema';

export const PoiEnrichmentCacheUpsertOneSchema: z.ZodType<Prisma.PoiEnrichmentCacheUpsertArgs> = z.object({ select: PoiEnrichmentCacheSelectObjectSchema.optional(),  where: PoiEnrichmentCacheWhereUniqueInputObjectSchema, create: z.union([ PoiEnrichmentCacheCreateInputObjectSchema, PoiEnrichmentCacheUncheckedCreateInputObjectSchema ]), update: z.union([ PoiEnrichmentCacheUpdateInputObjectSchema, PoiEnrichmentCacheUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.PoiEnrichmentCacheUpsertArgs>;

export const PoiEnrichmentCacheUpsertOneZodSchema = z.object({ select: PoiEnrichmentCacheSelectObjectSchema.optional(),  where: PoiEnrichmentCacheWhereUniqueInputObjectSchema, create: z.union([ PoiEnrichmentCacheCreateInputObjectSchema, PoiEnrichmentCacheUncheckedCreateInputObjectSchema ]), update: z.union([ PoiEnrichmentCacheUpdateInputObjectSchema, PoiEnrichmentCacheUncheckedUpdateInputObjectSchema ]) }).strict();