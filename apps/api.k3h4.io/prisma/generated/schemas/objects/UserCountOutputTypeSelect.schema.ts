import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCountOutputTypeCountRefreshTokensArgsObjectSchema as UserCountOutputTypeCountRefreshTokensArgsObjectSchema } from './UserCountOutputTypeCountRefreshTokensArgs.schema';
import { UserCountOutputTypeCountTelemetryArgsObjectSchema as UserCountOutputTypeCountTelemetryArgsObjectSchema } from './UserCountOutputTypeCountTelemetryArgs.schema';
import { UserCountOutputTypeCountBankTransactionsArgsObjectSchema as UserCountOutputTypeCountBankTransactionsArgsObjectSchema } from './UserCountOutputTypeCountBankTransactionsArgs.schema';
import { UserCountOutputTypeCountPersonasArgsObjectSchema as UserCountOutputTypeCountPersonasArgsObjectSchema } from './UserCountOutputTypeCountPersonasArgs.schema';
import { UserCountOutputTypeCountAssignmentsArgsObjectSchema as UserCountOutputTypeCountAssignmentsArgsObjectSchema } from './UserCountOutputTypeCountAssignmentsArgs.schema';
import { UserCountOutputTypeCountStaffingEngagementsArgsObjectSchema as UserCountOutputTypeCountStaffingEngagementsArgsObjectSchema } from './UserCountOutputTypeCountStaffingEngagementsArgs.schema';
import { UserCountOutputTypeCountStaffingRolesArgsObjectSchema as UserCountOutputTypeCountStaffingRolesArgsObjectSchema } from './UserCountOutputTypeCountStaffingRolesArgs.schema';
import { UserCountOutputTypeCountStaffingCandidatesArgsObjectSchema as UserCountOutputTypeCountStaffingCandidatesArgsObjectSchema } from './UserCountOutputTypeCountStaffingCandidatesArgs.schema';
import { UserCountOutputTypeCountStaffingShiftsArgsObjectSchema as UserCountOutputTypeCountStaffingShiftsArgsObjectSchema } from './UserCountOutputTypeCountStaffingShiftsArgs.schema';
import { UserCountOutputTypeCountStaffingPlacementsArgsObjectSchema as UserCountOutputTypeCountStaffingPlacementsArgsObjectSchema } from './UserCountOutputTypeCountStaffingPlacementsArgs.schema';
import { UserCountOutputTypeCountFreightLoadsArgsObjectSchema as UserCountOutputTypeCountFreightLoadsArgsObjectSchema } from './UserCountOutputTypeCountFreightLoadsArgs.schema';
import { UserCountOutputTypeCountWarehouseItemsArgsObjectSchema as UserCountOutputTypeCountWarehouseItemsArgsObjectSchema } from './UserCountOutputTypeCountWarehouseItemsArgs.schema';
import { UserCountOutputTypeCountPosStoresArgsObjectSchema as UserCountOutputTypeCountPosStoresArgsObjectSchema } from './UserCountOutputTypeCountPosStoresArgs.schema';
import { UserCountOutputTypeCountPosTicketsArgsObjectSchema as UserCountOutputTypeCountPosTicketsArgsObjectSchema } from './UserCountOutputTypeCountPosTicketsArgs.schema';
import { UserCountOutputTypeCountAgriculturePlotsArgsObjectSchema as UserCountOutputTypeCountAgriculturePlotsArgsObjectSchema } from './UserCountOutputTypeCountAgriculturePlotsArgs.schema';
import { UserCountOutputTypeCountAgricultureTasksArgsObjectSchema as UserCountOutputTypeCountAgricultureTasksArgsObjectSchema } from './UserCountOutputTypeCountAgricultureTasksArgs.schema';
import { UserCountOutputTypeCountAgricultureShipmentsArgsObjectSchema as UserCountOutputTypeCountAgricultureShipmentsArgsObjectSchema } from './UserCountOutputTypeCountAgricultureShipmentsArgs.schema';
import { UserCountOutputTypeCountAgricultureCropPlansArgsObjectSchema as UserCountOutputTypeCountAgricultureCropPlansArgsObjectSchema } from './UserCountOutputTypeCountAgricultureCropPlansArgs.schema';
import { UserCountOutputTypeCountAgriculturePlotConditionsArgsObjectSchema as UserCountOutputTypeCountAgriculturePlotConditionsArgsObjectSchema } from './UserCountOutputTypeCountAgriculturePlotConditionsArgs.schema';
import { UserCountOutputTypeCountAgricultureInventoriesArgsObjectSchema as UserCountOutputTypeCountAgricultureInventoriesArgsObjectSchema } from './UserCountOutputTypeCountAgricultureInventoriesArgs.schema';
import { UserCountOutputTypeCountAgricultureInventoryMovementsArgsObjectSchema as UserCountOutputTypeCountAgricultureInventoryMovementsArgsObjectSchema } from './UserCountOutputTypeCountAgricultureInventoryMovementsArgs.schema';
import { UserCountOutputTypeCountAgricultureSlotsArgsObjectSchema as UserCountOutputTypeCountAgricultureSlotsArgsObjectSchema } from './UserCountOutputTypeCountAgricultureSlotsArgs.schema';
import { UserCountOutputTypeCountCulinaryMenuItemsArgsObjectSchema as UserCountOutputTypeCountCulinaryMenuItemsArgsObjectSchema } from './UserCountOutputTypeCountCulinaryMenuItemsArgs.schema';
import { UserCountOutputTypeCountCulinaryPrepTasksArgsObjectSchema as UserCountOutputTypeCountCulinaryPrepTasksArgsObjectSchema } from './UserCountOutputTypeCountCulinaryPrepTasksArgs.schema';
import { UserCountOutputTypeCountCulinarySupplierNeedsArgsObjectSchema as UserCountOutputTypeCountCulinarySupplierNeedsArgsObjectSchema } from './UserCountOutputTypeCountCulinarySupplierNeedsArgs.schema';
import { UserCountOutputTypeCountArcadeMachinesArgsObjectSchema as UserCountOutputTypeCountArcadeMachinesArgsObjectSchema } from './UserCountOutputTypeCountArcadeMachinesArgs.schema';
import { UserCountOutputTypeCountArcadeCardsArgsObjectSchema as UserCountOutputTypeCountArcadeCardsArgsObjectSchema } from './UserCountOutputTypeCountArcadeCardsArgs.schema';
import { UserCountOutputTypeCountArcadeTopUpsArgsObjectSchema as UserCountOutputTypeCountArcadeTopUpsArgsObjectSchema } from './UserCountOutputTypeCountArcadeTopUpsArgs.schema';
import { UserCountOutputTypeCountArcadePrizesArgsObjectSchema as UserCountOutputTypeCountArcadePrizesArgsObjectSchema } from './UserCountOutputTypeCountArcadePrizesArgs.schema';
import { UserCountOutputTypeCountArcadeSessionsArgsObjectSchema as UserCountOutputTypeCountArcadeSessionsArgsObjectSchema } from './UserCountOutputTypeCountArcadeSessionsArgs.schema';
import { UserCountOutputTypeCountArcadeRedemptionsArgsObjectSchema as UserCountOutputTypeCountArcadeRedemptionsArgsObjectSchema } from './UserCountOutputTypeCountArcadeRedemptionsArgs.schema';
import { UserCountOutputTypeCountProviderGrantsArgsObjectSchema as UserCountOutputTypeCountProviderGrantsArgsObjectSchema } from './UserCountOutputTypeCountProviderGrantsArgs.schema';
import { UserCountOutputTypeCountGeoRouteCachesArgsObjectSchema as UserCountOutputTypeCountGeoRouteCachesArgsObjectSchema } from './UserCountOutputTypeCountGeoRouteCachesArgs.schema';
import { UserCountOutputTypeCountGeoPoiCachesArgsObjectSchema as UserCountOutputTypeCountGeoPoiCachesArgsObjectSchema } from './UserCountOutputTypeCountGeoPoiCachesArgs.schema';
import { UserCountOutputTypeCountGeoQueryCachesArgsObjectSchema as UserCountOutputTypeCountGeoQueryCachesArgsObjectSchema } from './UserCountOutputTypeCountGeoQueryCachesArgs.schema';
import { UserCountOutputTypeCountMaptilerQueriesArgsObjectSchema as UserCountOutputTypeCountMaptilerQueriesArgsObjectSchema } from './UserCountOutputTypeCountMaptilerQueriesArgs.schema';
import { UserCountOutputTypeCountMaptilerCacheEntriesArgsObjectSchema as UserCountOutputTypeCountMaptilerCacheEntriesArgsObjectSchema } from './UserCountOutputTypeCountMaptilerCacheEntriesArgs.schema';
import { UserCountOutputTypeCountOsrmCacheEntriesArgsObjectSchema as UserCountOutputTypeCountOsrmCacheEntriesArgsObjectSchema } from './UserCountOutputTypeCountOsrmCacheEntriesArgs.schema';
import { UserCountOutputTypeCountGeoStatusLogsArgsObjectSchema as UserCountOutputTypeCountGeoStatusLogsArgsObjectSchema } from './UserCountOutputTypeCountGeoStatusLogsArgs.schema';
import { UserCountOutputTypeCountGeoDemTileCachesArgsObjectSchema as UserCountOutputTypeCountGeoDemTileCachesArgsObjectSchema } from './UserCountOutputTypeCountGeoDemTileCachesArgs.schema';
import { UserCountOutputTypeCountPersonaAttributesArgsObjectSchema as UserCountOutputTypeCountPersonaAttributesArgsObjectSchema } from './UserCountOutputTypeCountPersonaAttributesArgs.schema';
import { UserCountOutputTypeCountPersonaCompatibilitiesArgsObjectSchema as UserCountOutputTypeCountPersonaCompatibilitiesArgsObjectSchema } from './UserCountOutputTypeCountPersonaCompatibilitiesArgs.schema';
import { UserCountOutputTypeCountGeoViewHistoriesArgsObjectSchema as UserCountOutputTypeCountGeoViewHistoriesArgsObjectSchema } from './UserCountOutputTypeCountGeoViewHistoriesArgs.schema'

const makeSchema = () => z.object({
  refreshTokens: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountRefreshTokensArgsObjectSchema)]).optional(),
  telemetry: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountTelemetryArgsObjectSchema)]).optional(),
  bankTransactions: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountBankTransactionsArgsObjectSchema)]).optional(),
  personas: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountPersonasArgsObjectSchema)]).optional(),
  assignments: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountAssignmentsArgsObjectSchema)]).optional(),
  staffingEngagements: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountStaffingEngagementsArgsObjectSchema)]).optional(),
  staffingRoles: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountStaffingRolesArgsObjectSchema)]).optional(),
  staffingCandidates: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountStaffingCandidatesArgsObjectSchema)]).optional(),
  staffingShifts: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountStaffingShiftsArgsObjectSchema)]).optional(),
  staffingPlacements: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountStaffingPlacementsArgsObjectSchema)]).optional(),
  freightLoads: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountFreightLoadsArgsObjectSchema)]).optional(),
  warehouseItems: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountWarehouseItemsArgsObjectSchema)]).optional(),
  posStores: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountPosStoresArgsObjectSchema)]).optional(),
  posTickets: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountPosTicketsArgsObjectSchema)]).optional(),
  agriculturePlots: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountAgriculturePlotsArgsObjectSchema)]).optional(),
  agricultureTasks: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountAgricultureTasksArgsObjectSchema)]).optional(),
  agricultureShipments: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountAgricultureShipmentsArgsObjectSchema)]).optional(),
  agricultureCropPlans: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountAgricultureCropPlansArgsObjectSchema)]).optional(),
  agriculturePlotConditions: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountAgriculturePlotConditionsArgsObjectSchema)]).optional(),
  agricultureInventories: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountAgricultureInventoriesArgsObjectSchema)]).optional(),
  agricultureInventoryMovements: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountAgricultureInventoryMovementsArgsObjectSchema)]).optional(),
  agricultureSlots: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountAgricultureSlotsArgsObjectSchema)]).optional(),
  culinaryMenuItems: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountCulinaryMenuItemsArgsObjectSchema)]).optional(),
  culinaryPrepTasks: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountCulinaryPrepTasksArgsObjectSchema)]).optional(),
  culinarySupplierNeeds: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountCulinarySupplierNeedsArgsObjectSchema)]).optional(),
  arcadeMachines: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountArcadeMachinesArgsObjectSchema)]).optional(),
  arcadeCards: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountArcadeCardsArgsObjectSchema)]).optional(),
  arcadeTopUps: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountArcadeTopUpsArgsObjectSchema)]).optional(),
  arcadePrizes: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountArcadePrizesArgsObjectSchema)]).optional(),
  arcadeSessions: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountArcadeSessionsArgsObjectSchema)]).optional(),
  arcadeRedemptions: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountArcadeRedemptionsArgsObjectSchema)]).optional(),
  providerGrants: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountProviderGrantsArgsObjectSchema)]).optional(),
  geoRouteCaches: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountGeoRouteCachesArgsObjectSchema)]).optional(),
  geoPoiCaches: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountGeoPoiCachesArgsObjectSchema)]).optional(),
  geoQueryCaches: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountGeoQueryCachesArgsObjectSchema)]).optional(),
  maptilerQueries: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountMaptilerQueriesArgsObjectSchema)]).optional(),
  maptilerCacheEntries: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountMaptilerCacheEntriesArgsObjectSchema)]).optional(),
  osrmCacheEntries: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountOsrmCacheEntriesArgsObjectSchema)]).optional(),
  geoStatusLogs: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountGeoStatusLogsArgsObjectSchema)]).optional(),
  geoDemTileCaches: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountGeoDemTileCachesArgsObjectSchema)]).optional(),
  personaAttributes: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountPersonaAttributesArgsObjectSchema)]).optional(),
  personaCompatibilities: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountPersonaCompatibilitiesArgsObjectSchema)]).optional(),
  geoViewHistories: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountGeoViewHistoriesArgsObjectSchema)]).optional()
}).strict();
export const UserCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.UserCountOutputTypeSelect>;
export const UserCountOutputTypeSelectObjectZodSchema = makeSchema();
