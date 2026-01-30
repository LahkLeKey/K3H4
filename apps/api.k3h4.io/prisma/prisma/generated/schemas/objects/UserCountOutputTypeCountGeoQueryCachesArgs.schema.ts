import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoQueryCacheWhereInputObjectSchema as GeoQueryCacheWhereInputObjectSchema } from './GeoQueryCacheWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => GeoQueryCacheWhereInputObjectSchema).optional()
}).strict();
export const UserCountOutputTypeCountGeoQueryCachesArgsObjectSchema = makeSchema();
export const UserCountOutputTypeCountGeoQueryCachesArgsObjectZodSchema = makeSchema();
