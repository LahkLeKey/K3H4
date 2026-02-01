import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EnrichmentCacheProvider_namespace_kind_sourceKeyCompoundUniqueInputObjectSchema as EnrichmentCacheProvider_namespace_kind_sourceKeyCompoundUniqueInputObjectSchema } from './EnrichmentCacheProvider_namespace_kind_sourceKeyCompoundUniqueInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  provider_namespace_kind_sourceKey: z.lazy(() => EnrichmentCacheProvider_namespace_kind_sourceKeyCompoundUniqueInputObjectSchema).optional()
}).strict();
export const EnrichmentCacheWhereUniqueInputObjectSchema: z.ZodType<Prisma.EnrichmentCacheWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.EnrichmentCacheWhereUniqueInput>;
export const EnrichmentCacheWhereUniqueInputObjectZodSchema = makeSchema();
