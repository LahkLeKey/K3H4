import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  entityId: z.string(),
  key: z.string()
}).strict();
export const EntityCacheEntity_cache_keyCompoundUniqueInputObjectSchema: z.ZodType<Prisma.EntityCacheEntity_cache_keyCompoundUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.EntityCacheEntity_cache_keyCompoundUniqueInput>;
export const EntityCacheEntity_cache_keyCompoundUniqueInputObjectZodSchema = makeSchema();
