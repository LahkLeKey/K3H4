import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { EnrichmentCacheUpdateManyMutationInputObjectSchema as EnrichmentCacheUpdateManyMutationInputObjectSchema } from './objects/EnrichmentCacheUpdateManyMutationInput.schema';
import { EnrichmentCacheWhereInputObjectSchema as EnrichmentCacheWhereInputObjectSchema } from './objects/EnrichmentCacheWhereInput.schema';

export const EnrichmentCacheUpdateManySchema: z.ZodType<Prisma.EnrichmentCacheUpdateManyArgs> = z.object({ data: EnrichmentCacheUpdateManyMutationInputObjectSchema, where: EnrichmentCacheWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.EnrichmentCacheUpdateManyArgs>;

export const EnrichmentCacheUpdateManyZodSchema = z.object({ data: EnrichmentCacheUpdateManyMutationInputObjectSchema, where: EnrichmentCacheWhereInputObjectSchema.optional() }).strict();