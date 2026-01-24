import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { EnrichmentCacheSelectObjectSchema as EnrichmentCacheSelectObjectSchema } from './objects/EnrichmentCacheSelect.schema';
import { EnrichmentCacheUpdateInputObjectSchema as EnrichmentCacheUpdateInputObjectSchema } from './objects/EnrichmentCacheUpdateInput.schema';
import { EnrichmentCacheUncheckedUpdateInputObjectSchema as EnrichmentCacheUncheckedUpdateInputObjectSchema } from './objects/EnrichmentCacheUncheckedUpdateInput.schema';
import { EnrichmentCacheWhereUniqueInputObjectSchema as EnrichmentCacheWhereUniqueInputObjectSchema } from './objects/EnrichmentCacheWhereUniqueInput.schema';

export const EnrichmentCacheUpdateOneSchema: z.ZodType<Prisma.EnrichmentCacheUpdateArgs> = z.object({ select: EnrichmentCacheSelectObjectSchema.optional(),  data: z.union([EnrichmentCacheUpdateInputObjectSchema, EnrichmentCacheUncheckedUpdateInputObjectSchema]), where: EnrichmentCacheWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.EnrichmentCacheUpdateArgs>;

export const EnrichmentCacheUpdateOneZodSchema = z.object({ select: EnrichmentCacheSelectObjectSchema.optional(),  data: z.union([EnrichmentCacheUpdateInputObjectSchema, EnrichmentCacheUncheckedUpdateInputObjectSchema]), where: EnrichmentCacheWhereUniqueInputObjectSchema }).strict();