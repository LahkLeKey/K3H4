import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ActorCacheActor_cache_keyCompoundUniqueInputObjectSchema as ActorCacheActor_cache_keyCompoundUniqueInputObjectSchema } from './ActorCacheActor_cache_keyCompoundUniqueInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  actor_cache_key: z.lazy(() => ActorCacheActor_cache_keyCompoundUniqueInputObjectSchema).optional()
}).strict();
export const ActorCacheWhereUniqueInputObjectSchema: z.ZodType<Prisma.ActorCacheWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.ActorCacheWhereUniqueInput>;
export const ActorCacheWhereUniqueInputObjectZodSchema = makeSchema();
