import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  provider: z.string(),
  namespace: z.string(),
  kind: z.string(),
  sourceKey: z.string()
}).strict();
export const EnrichmentCacheProvider_namespace_kind_sourceKeyCompoundUniqueInputObjectSchema: z.ZodType<Prisma.EnrichmentCacheProvider_namespace_kind_sourceKeyCompoundUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.EnrichmentCacheProvider_namespace_kind_sourceKeyCompoundUniqueInput>;
export const EnrichmentCacheProvider_namespace_kind_sourceKeyCompoundUniqueInputObjectZodSchema = makeSchema();
