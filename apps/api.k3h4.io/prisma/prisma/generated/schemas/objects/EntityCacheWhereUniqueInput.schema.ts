import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EntityCacheEntity_cache_keyCompoundUniqueInputObjectSchema as EntityCacheEntity_cache_keyCompoundUniqueInputObjectSchema } from './EntityCacheEntity_cache_keyCompoundUniqueInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  entity_cache_key: z.lazy(() => EntityCacheEntity_cache_keyCompoundUniqueInputObjectSchema).optional()
}).strict();
export const EntityCacheWhereUniqueInputObjectSchema: z.ZodType<Prisma.EntityCacheWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.EntityCacheWhereUniqueInput>;
export const EntityCacheWhereUniqueInputObjectZodSchema = makeSchema();
