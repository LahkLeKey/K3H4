import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  actorId: z.string(),
  key: z.string()
}).strict();
export const ActorCacheActor_cache_keyCompoundUniqueInputObjectSchema: z.ZodType<Prisma.ActorCacheActor_cache_keyCompoundUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.ActorCacheActor_cache_keyCompoundUniqueInput>;
export const ActorCacheActor_cache_keyCompoundUniqueInputObjectZodSchema = makeSchema();
