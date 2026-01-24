import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  provider: z.string(),
  namespace: z.string(),
  kind: z.string(),
  sourceKey: z.string()
}).strict();
export const EnrichmentCacheProviderNamespaceKindSourceKeyCompoundUniqueInputObjectSchema: z.ZodType<Prisma.EnrichmentCacheProviderNamespaceKindSourceKeyCompoundUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.EnrichmentCacheProviderNamespaceKindSourceKeyCompoundUniqueInput>;
export const EnrichmentCacheProviderNamespaceKindSourceKeyCompoundUniqueInputObjectZodSchema = makeSchema();
