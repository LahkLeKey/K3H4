import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { EnrichmentCacheWhereInputObjectSchema as EnrichmentCacheWhereInputObjectSchema } from './objects/EnrichmentCacheWhereInput.schema';

export const EnrichmentCacheDeleteManySchema: z.ZodType<Prisma.EnrichmentCacheDeleteManyArgs> = z.object({ where: EnrichmentCacheWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.EnrichmentCacheDeleteManyArgs>;

export const EnrichmentCacheDeleteManyZodSchema = z.object({ where: EnrichmentCacheWhereInputObjectSchema.optional() }).strict();