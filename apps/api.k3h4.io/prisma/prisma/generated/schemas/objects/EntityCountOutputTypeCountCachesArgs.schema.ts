import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EntityCacheWhereInputObjectSchema as EntityCacheWhereInputObjectSchema } from './EntityCacheWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => EntityCacheWhereInputObjectSchema).optional()
}).strict();
export const EntityCountOutputTypeCountCachesArgsObjectSchema = makeSchema();
export const EntityCountOutputTypeCountCachesArgsObjectZodSchema = makeSchema();
