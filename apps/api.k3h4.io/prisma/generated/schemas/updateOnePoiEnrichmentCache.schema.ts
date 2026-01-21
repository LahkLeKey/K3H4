import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PoiEnrichmentCacheSelectObjectSchema as PoiEnrichmentCacheSelectObjectSchema } from './objects/PoiEnrichmentCacheSelect.schema';
import { PoiEnrichmentCacheUpdateInputObjectSchema as PoiEnrichmentCacheUpdateInputObjectSchema } from './objects/PoiEnrichmentCacheUpdateInput.schema';
import { PoiEnrichmentCacheUncheckedUpdateInputObjectSchema as PoiEnrichmentCacheUncheckedUpdateInputObjectSchema } from './objects/PoiEnrichmentCacheUncheckedUpdateInput.schema';
import { PoiEnrichmentCacheWhereUniqueInputObjectSchema as PoiEnrichmentCacheWhereUniqueInputObjectSchema } from './objects/PoiEnrichmentCacheWhereUniqueInput.schema';

export const PoiEnrichmentCacheUpdateOneSchema: z.ZodType<Prisma.PoiEnrichmentCacheUpdateArgs> = z.object({ select: PoiEnrichmentCacheSelectObjectSchema.optional(),  data: z.union([PoiEnrichmentCacheUpdateInputObjectSchema, PoiEnrichmentCacheUncheckedUpdateInputObjectSchema]), where: PoiEnrichmentCacheWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.PoiEnrichmentCacheUpdateArgs>;

export const PoiEnrichmentCacheUpdateOneZodSchema = z.object({ select: PoiEnrichmentCacheSelectObjectSchema.optional(),  data: z.union([PoiEnrichmentCacheUpdateInputObjectSchema, PoiEnrichmentCacheUncheckedUpdateInputObjectSchema]), where: PoiEnrichmentCacheWhereUniqueInputObjectSchema }).strict();