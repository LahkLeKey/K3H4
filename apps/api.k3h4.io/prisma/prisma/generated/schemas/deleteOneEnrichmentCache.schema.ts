import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { EnrichmentCacheSelectObjectSchema as EnrichmentCacheSelectObjectSchema } from './objects/EnrichmentCacheSelect.schema';
import { EnrichmentCacheWhereUniqueInputObjectSchema as EnrichmentCacheWhereUniqueInputObjectSchema } from './objects/EnrichmentCacheWhereUniqueInput.schema';

export const EnrichmentCacheDeleteOneSchema: z.ZodType<Prisma.EnrichmentCacheDeleteArgs> = z.object({ select: EnrichmentCacheSelectObjectSchema.optional(),  where: EnrichmentCacheWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.EnrichmentCacheDeleteArgs>;

export const EnrichmentCacheDeleteOneZodSchema = z.object({ select: EnrichmentCacheSelectObjectSchema.optional(),  where: EnrichmentCacheWhereUniqueInputObjectSchema }).strict();