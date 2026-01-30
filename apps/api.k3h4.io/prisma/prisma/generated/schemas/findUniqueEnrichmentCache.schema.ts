import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { EnrichmentCacheSelectObjectSchema as EnrichmentCacheSelectObjectSchema } from './objects/EnrichmentCacheSelect.schema';
import { EnrichmentCacheWhereUniqueInputObjectSchema as EnrichmentCacheWhereUniqueInputObjectSchema } from './objects/EnrichmentCacheWhereUniqueInput.schema';

export const EnrichmentCacheFindUniqueSchema: z.ZodType<Prisma.EnrichmentCacheFindUniqueArgs> = z.object({ select: EnrichmentCacheSelectObjectSchema.optional(),  where: EnrichmentCacheWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.EnrichmentCacheFindUniqueArgs>;

export const EnrichmentCacheFindUniqueZodSchema = z.object({ select: EnrichmentCacheSelectObjectSchema.optional(),  where: EnrichmentCacheWhereUniqueInputObjectSchema }).strict();