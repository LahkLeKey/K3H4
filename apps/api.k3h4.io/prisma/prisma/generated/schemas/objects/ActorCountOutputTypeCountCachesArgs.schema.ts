import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ActorCacheWhereInputObjectSchema as ActorCacheWhereInputObjectSchema } from './ActorCacheWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ActorCacheWhereInputObjectSchema).optional()
}).strict();
export const ActorCountOutputTypeCountCachesArgsObjectSchema = makeSchema();
export const ActorCountOutputTypeCountCachesArgsObjectZodSchema = makeSchema();
