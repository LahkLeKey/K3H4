import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCountOutputTypeCountRefreshTokensArgsObjectSchema as UserCountOutputTypeCountRefreshTokensArgsObjectSchema } from './UserCountOutputTypeCountRefreshTokensArgs.schema';
import { UserCountOutputTypeCountTelemetryArgsObjectSchema as UserCountOutputTypeCountTelemetryArgsObjectSchema } from './UserCountOutputTypeCountTelemetryArgs.schema';
import { UserCountOutputTypeCountFreightLoadsArgsObjectSchema as UserCountOutputTypeCountFreightLoadsArgsObjectSchema } from './UserCountOutputTypeCountFreightLoadsArgs.schema';
import { UserCountOutputTypeCountCulinaryMenuItemsArgsObjectSchema as UserCountOutputTypeCountCulinaryMenuItemsArgsObjectSchema } from './UserCountOutputTypeCountCulinaryMenuItemsArgs.schema';
import { UserCountOutputTypeCountCulinaryPrepTasksArgsObjectSchema as UserCountOutputTypeCountCulinaryPrepTasksArgsObjectSchema } from './UserCountOutputTypeCountCulinaryPrepTasksArgs.schema';
import { UserCountOutputTypeCountCulinarySupplierNeedsArgsObjectSchema as UserCountOutputTypeCountCulinarySupplierNeedsArgsObjectSchema } from './UserCountOutputTypeCountCulinarySupplierNeedsArgs.schema';
import { UserCountOutputTypeCountProviderGrantsArgsObjectSchema as UserCountOutputTypeCountProviderGrantsArgsObjectSchema } from './UserCountOutputTypeCountProviderGrantsArgs.schema';
import { UserCountOutputTypeCountGeoRouteCachesArgsObjectSchema as UserCountOutputTypeCountGeoRouteCachesArgsObjectSchema } from './UserCountOutputTypeCountGeoRouteCachesArgs.schema';
import { UserCountOutputTypeCountGeoDirectionsArgsObjectSchema as UserCountOutputTypeCountGeoDirectionsArgsObjectSchema } from './UserCountOutputTypeCountGeoDirectionsArgs.schema';
import { UserCountOutputTypeCountGeoPoiCachesArgsObjectSchema as UserCountOutputTypeCountGeoPoiCachesArgsObjectSchema } from './UserCountOutputTypeCountGeoPoiCachesArgs.schema';
import { UserCountOutputTypeCountGeoQueryCachesArgsObjectSchema as UserCountOutputTypeCountGeoQueryCachesArgsObjectSchema } from './UserCountOutputTypeCountGeoQueryCachesArgs.schema';
import { UserCountOutputTypeCountMaptilerQueriesArgsObjectSchema as UserCountOutputTypeCountMaptilerQueriesArgsObjectSchema } from './UserCountOutputTypeCountMaptilerQueriesArgs.schema';
import { UserCountOutputTypeCountMaptilerCacheEntriesArgsObjectSchema as UserCountOutputTypeCountMaptilerCacheEntriesArgsObjectSchema } from './UserCountOutputTypeCountMaptilerCacheEntriesArgs.schema';
import { UserCountOutputTypeCountOsrmCacheEntriesArgsObjectSchema as UserCountOutputTypeCountOsrmCacheEntriesArgsObjectSchema } from './UserCountOutputTypeCountOsrmCacheEntriesArgs.schema';
import { UserCountOutputTypeCountGeoStatusLogsArgsObjectSchema as UserCountOutputTypeCountGeoStatusLogsArgsObjectSchema } from './UserCountOutputTypeCountGeoStatusLogsArgs.schema';
import { UserCountOutputTypeCountGeoDemTileCachesArgsObjectSchema as UserCountOutputTypeCountGeoDemTileCachesArgsObjectSchema } from './UserCountOutputTypeCountGeoDemTileCachesArgs.schema';
import { UserCountOutputTypeCountGeoViewHistoriesArgsObjectSchema as UserCountOutputTypeCountGeoViewHistoriesArgsObjectSchema } from './UserCountOutputTypeCountGeoViewHistoriesArgs.schema';
import { UserCountOutputTypeCountChatSessionsArgsObjectSchema as UserCountOutputTypeCountChatSessionsArgsObjectSchema } from './UserCountOutputTypeCountChatSessionsArgs.schema';
import { UserCountOutputTypeCountAiInsightsArgsObjectSchema as UserCountOutputTypeCountAiInsightsArgsObjectSchema } from './UserCountOutputTypeCountAiInsightsArgs.schema';
import { UserCountOutputTypeCountOllamaOperationsArgsObjectSchema as UserCountOutputTypeCountOllamaOperationsArgsObjectSchema } from './UserCountOutputTypeCountOllamaOperationsArgs.schema';
import { UserCountOutputTypeCountActorsArgsObjectSchema as UserCountOutputTypeCountActorsArgsObjectSchema } from './UserCountOutputTypeCountActorsArgs.schema'

const makeSchema = () => z.object({
  refreshTokens: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountRefreshTokensArgsObjectSchema)]).optional(),
  telemetry: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountTelemetryArgsObjectSchema)]).optional(),
  freightLoads: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountFreightLoadsArgsObjectSchema)]).optional(),
  culinaryMenuItems: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountCulinaryMenuItemsArgsObjectSchema)]).optional(),
  culinaryPrepTasks: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountCulinaryPrepTasksArgsObjectSchema)]).optional(),
  culinarySupplierNeeds: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountCulinarySupplierNeedsArgsObjectSchema)]).optional(),
  providerGrants: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountProviderGrantsArgsObjectSchema)]).optional(),
  geoRouteCaches: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountGeoRouteCachesArgsObjectSchema)]).optional(),
  geoDirections: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountGeoDirectionsArgsObjectSchema)]).optional(),
  geoPoiCaches: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountGeoPoiCachesArgsObjectSchema)]).optional(),
  geoQueryCaches: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountGeoQueryCachesArgsObjectSchema)]).optional(),
  maptilerQueries: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountMaptilerQueriesArgsObjectSchema)]).optional(),
  maptilerCacheEntries: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountMaptilerCacheEntriesArgsObjectSchema)]).optional(),
  osrmCacheEntries: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountOsrmCacheEntriesArgsObjectSchema)]).optional(),
  geoStatusLogs: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountGeoStatusLogsArgsObjectSchema)]).optional(),
  geoDemTileCaches: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountGeoDemTileCachesArgsObjectSchema)]).optional(),
  geoViewHistories: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountGeoViewHistoriesArgsObjectSchema)]).optional(),
  chatSessions: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountChatSessionsArgsObjectSchema)]).optional(),
  aiInsights: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountAiInsightsArgsObjectSchema)]).optional(),
  ollamaOperations: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountOllamaOperationsArgsObjectSchema)]).optional(),
  actors: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountActorsArgsObjectSchema)]).optional()
}).strict();
export const UserCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.UserCountOutputTypeSelect>;
export const UserCountOutputTypeSelectObjectZodSchema = makeSchema();
