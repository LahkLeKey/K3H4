import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoStatusLogWhereInputObjectSchema as GeoStatusLogWhereInputObjectSchema } from './GeoStatusLogWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => GeoStatusLogWhereInputObjectSchema).optional()
}).strict();
export const UserCountOutputTypeCountGeoStatusLogsArgsObjectSchema = makeSchema();
export const UserCountOutputTypeCountGeoStatusLogsArgsObjectZodSchema = makeSchema();
