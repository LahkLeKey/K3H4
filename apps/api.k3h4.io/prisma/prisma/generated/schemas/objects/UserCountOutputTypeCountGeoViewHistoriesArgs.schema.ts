import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoViewHistoryWhereInputObjectSchema as GeoViewHistoryWhereInputObjectSchema } from './GeoViewHistoryWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => GeoViewHistoryWhereInputObjectSchema).optional()
}).strict();
export const UserCountOutputTypeCountGeoViewHistoriesArgsObjectSchema = makeSchema();
export const UserCountOutputTypeCountGeoViewHistoriesArgsObjectZodSchema = makeSchema();
