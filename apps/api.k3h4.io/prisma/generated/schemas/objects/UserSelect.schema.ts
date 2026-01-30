import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RefreshTokenFindManySchema as RefreshTokenFindManySchema } from '../findManyRefreshToken.schema';
import { UserPreferenceArgsObjectSchema as UserPreferenceArgsObjectSchema } from './UserPreferenceArgs.schema';
import { TelemetryEventFindManySchema as TelemetryEventFindManySchema } from '../findManyTelemetryEvent.schema';
import { FreightLoadFindManySchema as FreightLoadFindManySchema } from '../findManyFreightLoad.schema';
import { ProviderGrantFindManySchema as ProviderGrantFindManySchema } from '../findManyProviderGrant.schema';
import { GeoRouteCacheFindManySchema as GeoRouteCacheFindManySchema } from '../findManyGeoRouteCache.schema';
import { GeoDirectionFindManySchema as GeoDirectionFindManySchema } from '../findManyGeoDirection.schema';
import { GeoPoiCacheFindManySchema as GeoPoiCacheFindManySchema } from '../findManyGeoPoiCache.schema';
import { GeoQueryCacheFindManySchema as GeoQueryCacheFindManySchema } from '../findManyGeoQueryCache.schema';
import { MaptilerQueryFindManySchema as MaptilerQueryFindManySchema } from '../findManyMaptilerQuery.schema';
import { MaptilerCacheEntryFindManySchema as MaptilerCacheEntryFindManySchema } from '../findManyMaptilerCacheEntry.schema';
import { OsrmCacheEntryFindManySchema as OsrmCacheEntryFindManySchema } from '../findManyOsrmCacheEntry.schema';
import { GeoStatusLogFindManySchema as GeoStatusLogFindManySchema } from '../findManyGeoStatusLog.schema';
import { GeoDemTileCacheFindManySchema as GeoDemTileCacheFindManySchema } from '../findManyGeoDemTileCache.schema';
import { GeoViewHistoryFindManySchema as GeoViewHistoryFindManySchema } from '../findManyGeoViewHistory.schema';
import { ChatSessionFindManySchema as ChatSessionFindManySchema } from '../findManyChatSession.schema';
import { AiInsightFindManySchema as AiInsightFindManySchema } from '../findManyAiInsight.schema';
import { OllamaOperationFindManySchema as OllamaOperationFindManySchema } from '../findManyOllamaOperation.schema';
import { ActorFindManySchema as ActorFindManySchema } from '../findManyActor.schema';
import { UserCountOutputTypeArgsObjectSchema as UserCountOutputTypeArgsObjectSchema } from './UserCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  email: z.boolean().optional(),
  provider: z.boolean().optional(),
  providerId: z.boolean().optional(),
  k3h4CoinBalance: z.boolean().optional(),
  displayName: z.boolean().optional(),
  avatarUrl: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  refreshTokens: z.union([z.boolean(), z.lazy(() => RefreshTokenFindManySchema)]).optional(),
  preference: z.union([z.boolean(), z.lazy(() => UserPreferenceArgsObjectSchema)]).optional(),
  telemetry: z.union([z.boolean(), z.lazy(() => TelemetryEventFindManySchema)]).optional(),
  freightLoads: z.union([z.boolean(), z.lazy(() => FreightLoadFindManySchema)]).optional(),
  providerGrants: z.union([z.boolean(), z.lazy(() => ProviderGrantFindManySchema)]).optional(),
  geoRouteCaches: z.union([z.boolean(), z.lazy(() => GeoRouteCacheFindManySchema)]).optional(),
  geoDirections: z.union([z.boolean(), z.lazy(() => GeoDirectionFindManySchema)]).optional(),
  geoPoiCaches: z.union([z.boolean(), z.lazy(() => GeoPoiCacheFindManySchema)]).optional(),
  geoQueryCaches: z.union([z.boolean(), z.lazy(() => GeoQueryCacheFindManySchema)]).optional(),
  maptilerQueries: z.union([z.boolean(), z.lazy(() => MaptilerQueryFindManySchema)]).optional(),
  maptilerCacheEntries: z.union([z.boolean(), z.lazy(() => MaptilerCacheEntryFindManySchema)]).optional(),
  osrmCacheEntries: z.union([z.boolean(), z.lazy(() => OsrmCacheEntryFindManySchema)]).optional(),
  geoStatusLogs: z.union([z.boolean(), z.lazy(() => GeoStatusLogFindManySchema)]).optional(),
  geoDemTileCaches: z.union([z.boolean(), z.lazy(() => GeoDemTileCacheFindManySchema)]).optional(),
  geoViewHistories: z.union([z.boolean(), z.lazy(() => GeoViewHistoryFindManySchema)]).optional(),
  chatSessions: z.union([z.boolean(), z.lazy(() => ChatSessionFindManySchema)]).optional(),
  aiInsights: z.union([z.boolean(), z.lazy(() => AiInsightFindManySchema)]).optional(),
  ollamaOperations: z.union([z.boolean(), z.lazy(() => OllamaOperationFindManySchema)]).optional(),
  actors: z.union([z.boolean(), z.lazy(() => ActorFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const UserSelectObjectSchema: z.ZodType<Prisma.UserSelect> = makeSchema() as unknown as z.ZodType<Prisma.UserSelect>;
export const UserSelectObjectZodSchema = makeSchema();
