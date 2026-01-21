import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string(),
  includeHash: z.string()
}).strict();
export const PoiEnrichmentCacheIdIncludeHashCompoundUniqueInputObjectSchema: z.ZodType<Prisma.PoiEnrichmentCacheIdIncludeHashCompoundUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.PoiEnrichmentCacheIdIncludeHashCompoundUniqueInput>;
export const PoiEnrichmentCacheIdIncludeHashCompoundUniqueInputObjectZodSchema = makeSchema();
