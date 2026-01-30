import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCountOutputTypeCountRefreshTokensArgsObjectSchema as UserCountOutputTypeCountRefreshTokensArgsObjectSchema } from './UserCountOutputTypeCountRefreshTokensArgs.schema';
import { UserCountOutputTypeCountTelemetryArgsObjectSchema as UserCountOutputTypeCountTelemetryArgsObjectSchema } from './UserCountOutputTypeCountTelemetryArgs.schema';
import { UserCountOutputTypeCountPersonasArgsObjectSchema as UserCountOutputTypeCountPersonasArgsObjectSchema } from './UserCountOutputTypeCountPersonasArgs.schema';
import { UserCountOutputTypeCountAssignmentsArgsObjectSchema as UserCountOutputTypeCountAssignmentsArgsObjectSchema } from './UserCountOutputTypeCountAssignmentsArgs.schema';
import { UserCountOutputTypeCountStaffingEngagementsArgsObjectSchema as UserCountOutputTypeCountStaffingEngagementsArgsObjectSchema } from './UserCountOutputTypeCountStaffingEngagementsArgs.schema';
import { UserCountOutputTypeCountStaffingRolesArgsObjectSchema as UserCountOutputTypeCountStaffingRolesArgsObjectSchema } from './UserCountOutputTypeCountStaffingRolesArgs.schema';
import { UserCountOutputTypeCountStaffingCandidatesArgsObjectSchema as UserCountOutputTypeCountStaffingCandidatesArgsObjectSchema } from './UserCountOutputTypeCountStaffingCandidatesArgs.schema';
import { UserCountOutputTypeCountStaffingShiftsArgsObjectSchema as UserCountOutputTypeCountStaffingShiftsArgsObjectSchema } from './UserCountOutputTypeCountStaffingShiftsArgs.schema';
import { UserCountOutputTypeCountStaffingPlacementsArgsObjectSchema as UserCountOutputTypeCountStaffingPlacementsArgsObjectSchema } from './UserCountOutputTypeCountStaffingPlacementsArgs.schema';
import { UserCountOutputTypeCountFreightLoadsArgsObjectSchema as UserCountOutputTypeCountFreightLoadsArgsObjectSchema } from './UserCountOutputTypeCountFreightLoadsArgs.schema';
import { UserCountOutputTypeCountPosStoresArgsObjectSchema as UserCountOutputTypeCountPosStoresArgsObjectSchema } from './UserCountOutputTypeCountPosStoresArgs.schema';
import { UserCountOutputTypeCountPosTicketsArgsObjectSchema as UserCountOutputTypeCountPosTicketsArgsObjectSchema } from './UserCountOutputTypeCountPosTicketsArgs.schema';
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
import { UserCountOutputTypeCountPersonaAttributesArgsObjectSchema as UserCountOutputTypeCountPersonaAttributesArgsObjectSchema } from './UserCountOutputTypeCountPersonaAttributesArgs.schema';
import { UserCountOutputTypeCountPersonaCompatibilitiesArgsObjectSchema as UserCountOutputTypeCountPersonaCompatibilitiesArgsObjectSchema } from './UserCountOutputTypeCountPersonaCompatibilitiesArgs.schema';
import { UserCountOutputTypeCountGeoViewHistoriesArgsObjectSchema as UserCountOutputTypeCountGeoViewHistoriesArgsObjectSchema } from './UserCountOutputTypeCountGeoViewHistoriesArgs.schema';
import { UserCountOutputTypeCountChatSessionsArgsObjectSchema as UserCountOutputTypeCountChatSessionsArgsObjectSchema } from './UserCountOutputTypeCountChatSessionsArgs.schema';
import { UserCountOutputTypeCountAiInsightsArgsObjectSchema as UserCountOutputTypeCountAiInsightsArgsObjectSchema } from './UserCountOutputTypeCountAiInsightsArgs.schema';
import { UserCountOutputTypeCountOllamaOperationsArgsObjectSchema as UserCountOutputTypeCountOllamaOperationsArgsObjectSchema } from './UserCountOutputTypeCountOllamaOperationsArgs.schema';
import { UserCountOutputTypeCountActorsArgsObjectSchema as UserCountOutputTypeCountActorsArgsObjectSchema } from './UserCountOutputTypeCountActorsArgs.schema'

const makeSchema = () => z.object({
  refreshTokens: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountRefreshTokensArgsObjectSchema)]).optional(),
  telemetry: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountTelemetryArgsObjectSchema)]).optional(),
  personas: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountPersonasArgsObjectSchema)]).optional(),
  assignments: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountAssignmentsArgsObjectSchema)]).optional(),
  staffingEngagements: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountStaffingEngagementsArgsObjectSchema)]).optional(),
  staffingRoles: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountStaffingRolesArgsObjectSchema)]).optional(),
  staffingCandidates: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountStaffingCandidatesArgsObjectSchema)]).optional(),
  staffingShifts: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountStaffingShiftsArgsObjectSchema)]).optional(),
  staffingPlacements: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountStaffingPlacementsArgsObjectSchema)]).optional(),
  freightLoads: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountFreightLoadsArgsObjectSchema)]).optional(),
  posStores: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountPosStoresArgsObjectSchema)]).optional(),
  posTickets: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountPosTicketsArgsObjectSchema)]).optional(),
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
  personaAttributes: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountPersonaAttributesArgsObjectSchema)]).optional(),
  personaCompatibilities: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountPersonaCompatibilitiesArgsObjectSchema)]).optional(),
  geoViewHistories: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountGeoViewHistoriesArgsObjectSchema)]).optional(),
  chatSessions: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountChatSessionsArgsObjectSchema)]).optional(),
  aiInsights: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountAiInsightsArgsObjectSchema)]).optional(),
  ollamaOperations: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountOllamaOperationsArgsObjectSchema)]).optional(),
  actors: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountActorsArgsObjectSchema)]).optional()
}).strict();
export const UserCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.UserCountOutputTypeSelect>;
export const UserCountOutputTypeSelectObjectZodSchema = makeSchema();
