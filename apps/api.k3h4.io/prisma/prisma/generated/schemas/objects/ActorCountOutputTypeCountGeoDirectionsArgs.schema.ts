import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoDirectionWhereInputObjectSchema as GeoDirectionWhereInputObjectSchema } from './GeoDirectionWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => GeoDirectionWhereInputObjectSchema).optional()
}).strict();
export const ActorCountOutputTypeCountGeoDirectionsArgsObjectSchema = makeSchema();
export const ActorCountOutputTypeCountGeoDirectionsArgsObjectZodSchema = makeSchema();
