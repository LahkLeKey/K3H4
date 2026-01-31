import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ActorCountOutputTypeCountEntitiesArgsObjectSchema as ActorCountOutputTypeCountEntitiesArgsObjectSchema } from './ActorCountOutputTypeCountEntitiesArgs.schema';
import { ActorCountOutputTypeCountCachesArgsObjectSchema as ActorCountOutputTypeCountCachesArgsObjectSchema } from './ActorCountOutputTypeCountCachesArgs.schema';
import { ActorCountOutputTypeCountGeoDirectionsArgsObjectSchema as ActorCountOutputTypeCountGeoDirectionsArgsObjectSchema } from './ActorCountOutputTypeCountGeoDirectionsArgs.schema';
import { ActorCountOutputTypeCountMaptilerQueriesArgsObjectSchema as ActorCountOutputTypeCountMaptilerQueriesArgsObjectSchema } from './ActorCountOutputTypeCountMaptilerQueriesArgs.schema';
import { ActorCountOutputTypeCountMaptilerCacheEntriesArgsObjectSchema as ActorCountOutputTypeCountMaptilerCacheEntriesArgsObjectSchema } from './ActorCountOutputTypeCountMaptilerCacheEntriesArgs.schema';
import { ActorCountOutputTypeCountOsrmCacheEntriesArgsObjectSchema as ActorCountOutputTypeCountOsrmCacheEntriesArgsObjectSchema } from './ActorCountOutputTypeCountOsrmCacheEntriesArgs.schema'

const makeSchema = () => z.object({
  entities: z.union([z.boolean(), z.lazy(() => ActorCountOutputTypeCountEntitiesArgsObjectSchema)]).optional(),
  caches: z.union([z.boolean(), z.lazy(() => ActorCountOutputTypeCountCachesArgsObjectSchema)]).optional(),
  geoDirections: z.union([z.boolean(), z.lazy(() => ActorCountOutputTypeCountGeoDirectionsArgsObjectSchema)]).optional(),
  maptilerQueries: z.union([z.boolean(), z.lazy(() => ActorCountOutputTypeCountMaptilerQueriesArgsObjectSchema)]).optional(),
  maptilerCacheEntries: z.union([z.boolean(), z.lazy(() => ActorCountOutputTypeCountMaptilerCacheEntriesArgsObjectSchema)]).optional(),
  osrmCacheEntries: z.union([z.boolean(), z.lazy(() => ActorCountOutputTypeCountOsrmCacheEntriesArgsObjectSchema)]).optional()
}).strict();
export const ActorCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.ActorCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.ActorCountOutputTypeSelect>;
export const ActorCountOutputTypeSelectObjectZodSchema = makeSchema();
