import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { EnrichmentCacheSelectObjectSchema as EnrichmentCacheSelectObjectSchema } from './objects/EnrichmentCacheSelect.schema';
import { EnrichmentCacheCreateManyInputObjectSchema as EnrichmentCacheCreateManyInputObjectSchema } from './objects/EnrichmentCacheCreateManyInput.schema';

export const EnrichmentCacheCreateManyAndReturnSchema: z.ZodType<Prisma.EnrichmentCacheCreateManyAndReturnArgs> = z.object({ select: EnrichmentCacheSelectObjectSchema.optional(), data: z.union([ EnrichmentCacheCreateManyInputObjectSchema, z.array(EnrichmentCacheCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.EnrichmentCacheCreateManyAndReturnArgs>;

export const EnrichmentCacheCreateManyAndReturnZodSchema = z.object({ select: EnrichmentCacheSelectObjectSchema.optional(), data: z.union([ EnrichmentCacheCreateManyInputObjectSchema, z.array(EnrichmentCacheCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();