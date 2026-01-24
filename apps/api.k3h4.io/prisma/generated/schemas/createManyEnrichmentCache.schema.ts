import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { EnrichmentCacheCreateManyInputObjectSchema as EnrichmentCacheCreateManyInputObjectSchema } from './objects/EnrichmentCacheCreateManyInput.schema';

export const EnrichmentCacheCreateManySchema: z.ZodType<Prisma.EnrichmentCacheCreateManyArgs> = z.object({ data: z.union([ EnrichmentCacheCreateManyInputObjectSchema, z.array(EnrichmentCacheCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.EnrichmentCacheCreateManyArgs>;

export const EnrichmentCacheCreateManyZodSchema = z.object({ data: z.union([ EnrichmentCacheCreateManyInputObjectSchema, z.array(EnrichmentCacheCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();