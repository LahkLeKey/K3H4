import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoDirectionStopWhereInputObjectSchema as GeoDirectionStopWhereInputObjectSchema } from './GeoDirectionStopWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => GeoDirectionStopWhereInputObjectSchema).optional()
}).strict();
export const GeoDirectionCountOutputTypeCountStopsArgsObjectSchema = makeSchema();
export const GeoDirectionCountOutputTypeCountStopsArgsObjectZodSchema = makeSchema();
