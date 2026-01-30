import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { EnrichmentCacheSelectObjectSchema as EnrichmentCacheSelectObjectSchema } from './objects/EnrichmentCacheSelect.schema';
import { EnrichmentCacheCreateInputObjectSchema as EnrichmentCacheCreateInputObjectSchema } from './objects/EnrichmentCacheCreateInput.schema';
import { EnrichmentCacheUncheckedCreateInputObjectSchema as EnrichmentCacheUncheckedCreateInputObjectSchema } from './objects/EnrichmentCacheUncheckedCreateInput.schema';

export const EnrichmentCacheCreateOneSchema: z.ZodType<Prisma.EnrichmentCacheCreateArgs> = z.object({ select: EnrichmentCacheSelectObjectSchema.optional(),  data: z.union([EnrichmentCacheCreateInputObjectSchema, EnrichmentCacheUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.EnrichmentCacheCreateArgs>;

export const EnrichmentCacheCreateOneZodSchema = z.object({ select: EnrichmentCacheSelectObjectSchema.optional(),  data: z.union([EnrichmentCacheCreateInputObjectSchema, EnrichmentCacheUncheckedCreateInputObjectSchema]) }).strict();