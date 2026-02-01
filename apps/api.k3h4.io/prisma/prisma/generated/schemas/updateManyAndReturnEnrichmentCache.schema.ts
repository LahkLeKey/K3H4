import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { EnrichmentCacheSelectObjectSchema as EnrichmentCacheSelectObjectSchema } from './objects/EnrichmentCacheSelect.schema';
import { EnrichmentCacheUpdateManyMutationInputObjectSchema as EnrichmentCacheUpdateManyMutationInputObjectSchema } from './objects/EnrichmentCacheUpdateManyMutationInput.schema';
import { EnrichmentCacheWhereInputObjectSchema as EnrichmentCacheWhereInputObjectSchema } from './objects/EnrichmentCacheWhereInput.schema';

export const EnrichmentCacheUpdateManyAndReturnSchema: z.ZodType<Prisma.EnrichmentCacheUpdateManyAndReturnArgs> = z.object({ select: EnrichmentCacheSelectObjectSchema.optional(), data: EnrichmentCacheUpdateManyMutationInputObjectSchema, where: EnrichmentCacheWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.EnrichmentCacheUpdateManyAndReturnArgs>;

export const EnrichmentCacheUpdateManyAndReturnZodSchema = z.object({ select: EnrichmentCacheSelectObjectSchema.optional(), data: EnrichmentCacheUpdateManyMutationInputObjectSchema, where: EnrichmentCacheWhereInputObjectSchema.optional() }).strict();