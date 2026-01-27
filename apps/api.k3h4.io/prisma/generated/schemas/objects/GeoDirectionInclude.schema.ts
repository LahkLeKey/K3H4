import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { GeoRouteCacheArgsObjectSchema as GeoRouteCacheArgsObjectSchema } from './GeoRouteCacheArgs.schema';
import { GeoDirectionStopFindManySchema as GeoDirectionStopFindManySchema } from '../findManyGeoDirectionStop.schema';
import { GeoDirectionSegmentFindManySchema as GeoDirectionSegmentFindManySchema } from '../findManyGeoDirectionSegment.schema';
import { GeoDirectionCountOutputTypeArgsObjectSchema as GeoDirectionCountOutputTypeArgsObjectSchema } from './GeoDirectionCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  routeCache: z.union([z.boolean(), z.lazy(() => GeoRouteCacheArgsObjectSchema)]).optional(),
  stops: z.union([z.boolean(), z.lazy(() => GeoDirectionStopFindManySchema)]).optional(),
  segments: z.union([z.boolean(), z.lazy(() => GeoDirectionSegmentFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => GeoDirectionCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const GeoDirectionIncludeObjectSchema: z.ZodType<Prisma.GeoDirectionInclude> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionInclude>;
export const GeoDirectionIncludeObjectZodSchema = makeSchema();
