import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EnrichmentCacheProviderNamespaceKindSourceKeyCompoundUniqueInputObjectSchema as EnrichmentCacheProviderNamespaceKindSourceKeyCompoundUniqueInputObjectSchema } from './EnrichmentCacheProviderNamespaceKindSourceKeyCompoundUniqueInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  provider_namespace_kind_sourceKey: z.lazy(() => EnrichmentCacheProviderNamespaceKindSourceKeyCompoundUniqueInputObjectSchema).optional()
}).strict();
export const EnrichmentCacheWhereUniqueInputObjectSchema: z.ZodType<Prisma.EnrichmentCacheWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.EnrichmentCacheWhereUniqueInput>;
export const EnrichmentCacheWhereUniqueInputObjectZodSchema = makeSchema();
