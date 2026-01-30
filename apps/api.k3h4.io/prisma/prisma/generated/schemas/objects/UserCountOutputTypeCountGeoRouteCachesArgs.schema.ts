import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoRouteCacheWhereInputObjectSchema as GeoRouteCacheWhereInputObjectSchema } from './GeoRouteCacheWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => GeoRouteCacheWhereInputObjectSchema).optional()
}).strict();
export const UserCountOutputTypeCountGeoRouteCachesArgsObjectSchema = makeSchema();
export const UserCountOutputTypeCountGeoRouteCachesArgsObjectZodSchema = makeSchema();
