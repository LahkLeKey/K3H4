import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PoiEnrichmentCacheIdIncludeHashCompoundUniqueInputObjectSchema as PoiEnrichmentCacheIdIncludeHashCompoundUniqueInputObjectSchema } from './PoiEnrichmentCacheIdIncludeHashCompoundUniqueInput.schema'

const makeSchema = () => z.object({
  id_includeHash: z.lazy(() => PoiEnrichmentCacheIdIncludeHashCompoundUniqueInputObjectSchema).optional()
}).strict();
export const PoiEnrichmentCacheWhereUniqueInputObjectSchema: z.ZodType<Prisma.PoiEnrichmentCacheWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.PoiEnrichmentCacheWhereUniqueInput>;
export const PoiEnrichmentCacheWhereUniqueInputObjectZodSchema = makeSchema();
