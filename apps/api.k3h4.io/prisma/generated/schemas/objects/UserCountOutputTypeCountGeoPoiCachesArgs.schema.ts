import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoPoiCacheWhereInputObjectSchema as GeoPoiCacheWhereInputObjectSchema } from './GeoPoiCacheWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => GeoPoiCacheWhereInputObjectSchema).optional()
}).strict();
export const UserCountOutputTypeCountGeoPoiCachesArgsObjectSchema = makeSchema();
export const UserCountOutputTypeCountGeoPoiCachesArgsObjectZodSchema = makeSchema();
