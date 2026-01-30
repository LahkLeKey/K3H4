import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoRouteCacheCountOutputTypeCountDirectionsArgsObjectSchema as GeoRouteCacheCountOutputTypeCountDirectionsArgsObjectSchema } from './GeoRouteCacheCountOutputTypeCountDirectionsArgs.schema'

const makeSchema = () => z.object({
  directions: z.union([z.boolean(), z.lazy(() => GeoRouteCacheCountOutputTypeCountDirectionsArgsObjectSchema)]).optional()
}).strict();
export const GeoRouteCacheCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.GeoRouteCacheCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.GeoRouteCacheCountOutputTypeSelect>;
export const GeoRouteCacheCountOutputTypeSelectObjectZodSchema = makeSchema();
