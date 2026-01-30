import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoDemTileCacheWhereInputObjectSchema as GeoDemTileCacheWhereInputObjectSchema } from './GeoDemTileCacheWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => GeoDemTileCacheWhereInputObjectSchema).optional()
}).strict();
export const UserCountOutputTypeCountGeoDemTileCachesArgsObjectSchema = makeSchema();
export const UserCountOutputTypeCountGeoDemTileCachesArgsObjectZodSchema = makeSchema();
