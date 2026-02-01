import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { EnrichmentCacheSelectObjectSchema as EnrichmentCacheSelectObjectSchema } from './objects/EnrichmentCacheSelect.schema';
import { EnrichmentCacheWhereUniqueInputObjectSchema as EnrichmentCacheWhereUniqueInputObjectSchema } from './objects/EnrichmentCacheWhereUniqueInput.schema';
import { EnrichmentCacheCreateInputObjectSchema as EnrichmentCacheCreateInputObjectSchema } from './objects/EnrichmentCacheCreateInput.schema';
import { EnrichmentCacheUncheckedCreateInputObjectSchema as EnrichmentCacheUncheckedCreateInputObjectSchema } from './objects/EnrichmentCacheUncheckedCreateInput.schema';
import { EnrichmentCacheUpdateInputObjectSchema as EnrichmentCacheUpdateInputObjectSchema } from './objects/EnrichmentCacheUpdateInput.schema';
import { EnrichmentCacheUncheckedUpdateInputObjectSchema as EnrichmentCacheUncheckedUpdateInputObjectSchema } from './objects/EnrichmentCacheUncheckedUpdateInput.schema';

export const EnrichmentCacheUpsertOneSchema: z.ZodType<Prisma.EnrichmentCacheUpsertArgs> = z.object({ select: EnrichmentCacheSelectObjectSchema.optional(),  where: EnrichmentCacheWhereUniqueInputObjectSchema, create: z.union([ EnrichmentCacheCreateInputObjectSchema, EnrichmentCacheUncheckedCreateInputObjectSchema ]), update: z.union([ EnrichmentCacheUpdateInputObjectSchema, EnrichmentCacheUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.EnrichmentCacheUpsertArgs>;

export const EnrichmentCacheUpsertOneZodSchema = z.object({ select: EnrichmentCacheSelectObjectSchema.optional(),  where: EnrichmentCacheWhereUniqueInputObjectSchema, create: z.union([ EnrichmentCacheCreateInputObjectSchema, EnrichmentCacheUncheckedCreateInputObjectSchema ]), update: z.union([ EnrichmentCacheUpdateInputObjectSchema, EnrichmentCacheUncheckedUpdateInputObjectSchema ]) }).strict();