import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { EntityFindManySchema as EntityFindManySchema } from '../findManyEntity.schema';
import { ActorCacheFindManySchema as ActorCacheFindManySchema } from '../findManyActorCache.schema';
import { GeoDirectionFindManySchema as GeoDirectionFindManySchema } from '../findManyGeoDirection.schema';
import { MaptilerQueryFindManySchema as MaptilerQueryFindManySchema } from '../findManyMaptilerQuery.schema';
import { MaptilerCacheEntryFindManySchema as MaptilerCacheEntryFindManySchema } from '../findManyMaptilerCacheEntry.schema';
import { OsrmCacheEntryFindManySchema as OsrmCacheEntryFindManySchema } from '../findManyOsrmCacheEntry.schema';
import { ActorCountOutputTypeArgsObjectSchema as ActorCountOutputTypeArgsObjectSchema } from './ActorCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  entities: z.union([z.boolean(), z.lazy(() => EntityFindManySchema)]).optional(),
  caches: z.union([z.boolean(), z.lazy(() => ActorCacheFindManySchema)]).optional(),
  geoDirections: z.union([z.boolean(), z.lazy(() => GeoDirectionFindManySchema)]).optional(),
  maptilerQueries: z.union([z.boolean(), z.lazy(() => MaptilerQueryFindManySchema)]).optional(),
  maptilerCacheEntries: z.union([z.boolean(), z.lazy(() => MaptilerCacheEntryFindManySchema)]).optional(),
  osrmCacheEntries: z.union([z.boolean(), z.lazy(() => OsrmCacheEntryFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => ActorCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const ActorIncludeObjectSchema: z.ZodType<Prisma.ActorInclude> = makeSchema() as unknown as z.ZodType<Prisma.ActorInclude>;
export const ActorIncludeObjectZodSchema = makeSchema();
