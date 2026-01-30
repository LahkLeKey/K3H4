import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PoiEnrichmentCacheWhereInputObjectSchema as PoiEnrichmentCacheWhereInputObjectSchema } from './objects/PoiEnrichmentCacheWhereInput.schema';

export const PoiEnrichmentCacheDeleteManySchema: z.ZodType<Prisma.PoiEnrichmentCacheDeleteManyArgs> = z.object({ where: PoiEnrichmentCacheWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.PoiEnrichmentCacheDeleteManyArgs>;

export const PoiEnrichmentCacheDeleteManyZodSchema = z.object({ where: PoiEnrichmentCacheWhereInputObjectSchema.optional() }).strict();