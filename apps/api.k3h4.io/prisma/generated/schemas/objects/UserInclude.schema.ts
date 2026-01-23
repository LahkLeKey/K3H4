import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RefreshTokenFindManySchema as RefreshTokenFindManySchema } from '../findManyRefreshToken.schema';
import { UserPreferenceArgsObjectSchema as UserPreferenceArgsObjectSchema } from './UserPreferenceArgs.schema';
import { TelemetryEventFindManySchema as TelemetryEventFindManySchema } from '../findManyTelemetryEvent.schema';
import { BankTransactionFindManySchema as BankTransactionFindManySchema } from '../findManyBankTransaction.schema';
import { PersonaFindManySchema as PersonaFindManySchema } from '../findManyPersona.schema';
import { AssignmentFindManySchema as AssignmentFindManySchema } from '../findManyAssignment.schema';
import { StaffingEngagementFindManySchema as StaffingEngagementFindManySchema } from '../findManyStaffingEngagement.schema';
import { StaffingRoleFindManySchema as StaffingRoleFindManySchema } from '../findManyStaffingRole.schema';
import { StaffingCandidateFindManySchema as StaffingCandidateFindManySchema } from '../findManyStaffingCandidate.schema';
import { StaffingShiftFindManySchema as StaffingShiftFindManySchema } from '../findManyStaffingShift.schema';
import { StaffingPlacementFindManySchema as StaffingPlacementFindManySchema } from '../findManyStaffingPlacement.schema';
import { FreightLoadFindManySchema as FreightLoadFindManySchema } from '../findManyFreightLoad.schema';
import { WarehouseItemFindManySchema as WarehouseItemFindManySchema } from '../findManyWarehouseItem.schema';
import { PosStoreFindManySchema as PosStoreFindManySchema } from '../findManyPosStore.schema';
import { PosTicketFindManySchema as PosTicketFindManySchema } from '../findManyPosTicket.schema';
import { AgriculturePlotFindManySchema as AgriculturePlotFindManySchema } from '../findManyAgriculturePlot.schema';
import { AgricultureTaskFindManySchema as AgricultureTaskFindManySchema } from '../findManyAgricultureTask.schema';
import { AgricultureShipmentFindManySchema as AgricultureShipmentFindManySchema } from '../findManyAgricultureShipment.schema';
import { AgricultureCropPlanFindManySchema as AgricultureCropPlanFindManySchema } from '../findManyAgricultureCropPlan.schema';
import { AgriculturePlotConditionFindManySchema as AgriculturePlotConditionFindManySchema } from '../findManyAgriculturePlotCondition.schema';
import { AgricultureInventoryFindManySchema as AgricultureInventoryFindManySchema } from '../findManyAgricultureInventory.schema';
import { AgricultureInventoryMovementFindManySchema as AgricultureInventoryMovementFindManySchema } from '../findManyAgricultureInventoryMovement.schema';
import { AgricultureSlotFindManySchema as AgricultureSlotFindManySchema } from '../findManyAgricultureSlot.schema';
import { CulinaryMenuItemFindManySchema as CulinaryMenuItemFindManySchema } from '../findManyCulinaryMenuItem.schema';
import { CulinaryPrepTaskFindManySchema as CulinaryPrepTaskFindManySchema } from '../findManyCulinaryPrepTask.schema';
import { CulinarySupplierNeedFindManySchema as CulinarySupplierNeedFindManySchema } from '../findManyCulinarySupplierNeed.schema';
import { ArcadeMachineFindManySchema as ArcadeMachineFindManySchema } from '../findManyArcadeMachine.schema';
import { ArcadeCardFindManySchema as ArcadeCardFindManySchema } from '../findManyArcadeCard.schema';
import { ArcadeTopUpFindManySchema as ArcadeTopUpFindManySchema } from '../findManyArcadeTopUp.schema';
import { ArcadePrizeFindManySchema as ArcadePrizeFindManySchema } from '../findManyArcadePrize.schema';
import { ArcadeSessionFindManySchema as ArcadeSessionFindManySchema } from '../findManyArcadeSession.schema';
import { ArcadeRedemptionFindManySchema as ArcadeRedemptionFindManySchema } from '../findManyArcadeRedemption.schema';
import { ProviderGrantFindManySchema as ProviderGrantFindManySchema } from '../findManyProviderGrant.schema';
import { GeoRouteCacheFindManySchema as GeoRouteCacheFindManySchema } from '../findManyGeoRouteCache.schema';
import { GeoPoiCacheFindManySchema as GeoPoiCacheFindManySchema } from '../findManyGeoPoiCache.schema';
import { GeoQueryCacheFindManySchema as GeoQueryCacheFindManySchema } from '../findManyGeoQueryCache.schema';
import { MaptilerQueryFindManySchema as MaptilerQueryFindManySchema } from '../findManyMaptilerQuery.schema';
import { MaptilerCacheEntryFindManySchema as MaptilerCacheEntryFindManySchema } from '../findManyMaptilerCacheEntry.schema';
import { OsrmCacheEntryFindManySchema as OsrmCacheEntryFindManySchema } from '../findManyOsrmCacheEntry.schema';
import { GeoStatusLogFindManySchema as GeoStatusLogFindManySchema } from '../findManyGeoStatusLog.schema';
import { GeoDemTileCacheFindManySchema as GeoDemTileCacheFindManySchema } from '../findManyGeoDemTileCache.schema';
import { PersonaAttributeFindManySchema as PersonaAttributeFindManySchema } from '../findManyPersonaAttribute.schema';
import { PersonaCompatibilityFindManySchema as PersonaCompatibilityFindManySchema } from '../findManyPersonaCompatibility.schema';
import { GeoViewHistoryFindManySchema as GeoViewHistoryFindManySchema } from '../findManyGeoViewHistory.schema';
import { ChatSessionFindManySchema as ChatSessionFindManySchema } from '../findManyChatSession.schema';
import { UserCountOutputTypeArgsObjectSchema as UserCountOutputTypeArgsObjectSchema } from './UserCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  refreshTokens: z.union([z.boolean(), z.lazy(() => RefreshTokenFindManySchema)]).optional(),
  preference: z.union([z.boolean(), z.lazy(() => UserPreferenceArgsObjectSchema)]).optional(),
  telemetry: z.union([z.boolean(), z.lazy(() => TelemetryEventFindManySchema)]).optional(),
  bankTransactions: z.union([z.boolean(), z.lazy(() => BankTransactionFindManySchema)]).optional(),
  personas: z.union([z.boolean(), z.lazy(() => PersonaFindManySchema)]).optional(),
  assignments: z.union([z.boolean(), z.lazy(() => AssignmentFindManySchema)]).optional(),
  staffingEngagements: z.union([z.boolean(), z.lazy(() => StaffingEngagementFindManySchema)]).optional(),
  staffingRoles: z.union([z.boolean(), z.lazy(() => StaffingRoleFindManySchema)]).optional(),
  staffingCandidates: z.union([z.boolean(), z.lazy(() => StaffingCandidateFindManySchema)]).optional(),
  staffingShifts: z.union([z.boolean(), z.lazy(() => StaffingShiftFindManySchema)]).optional(),
  staffingPlacements: z.union([z.boolean(), z.lazy(() => StaffingPlacementFindManySchema)]).optional(),
  freightLoads: z.union([z.boolean(), z.lazy(() => FreightLoadFindManySchema)]).optional(),
  warehouseItems: z.union([z.boolean(), z.lazy(() => WarehouseItemFindManySchema)]).optional(),
  posStores: z.union([z.boolean(), z.lazy(() => PosStoreFindManySchema)]).optional(),
  posTickets: z.union([z.boolean(), z.lazy(() => PosTicketFindManySchema)]).optional(),
  agriculturePlots: z.union([z.boolean(), z.lazy(() => AgriculturePlotFindManySchema)]).optional(),
  agricultureTasks: z.union([z.boolean(), z.lazy(() => AgricultureTaskFindManySchema)]).optional(),
  agricultureShipments: z.union([z.boolean(), z.lazy(() => AgricultureShipmentFindManySchema)]).optional(),
  agricultureCropPlans: z.union([z.boolean(), z.lazy(() => AgricultureCropPlanFindManySchema)]).optional(),
  agriculturePlotConditions: z.union([z.boolean(), z.lazy(() => AgriculturePlotConditionFindManySchema)]).optional(),
  agricultureInventories: z.union([z.boolean(), z.lazy(() => AgricultureInventoryFindManySchema)]).optional(),
  agricultureInventoryMovements: z.union([z.boolean(), z.lazy(() => AgricultureInventoryMovementFindManySchema)]).optional(),
  agricultureSlots: z.union([z.boolean(), z.lazy(() => AgricultureSlotFindManySchema)]).optional(),
  culinaryMenuItems: z.union([z.boolean(), z.lazy(() => CulinaryMenuItemFindManySchema)]).optional(),
  culinaryPrepTasks: z.union([z.boolean(), z.lazy(() => CulinaryPrepTaskFindManySchema)]).optional(),
  culinarySupplierNeeds: z.union([z.boolean(), z.lazy(() => CulinarySupplierNeedFindManySchema)]).optional(),
  arcadeMachines: z.union([z.boolean(), z.lazy(() => ArcadeMachineFindManySchema)]).optional(),
  arcadeCards: z.union([z.boolean(), z.lazy(() => ArcadeCardFindManySchema)]).optional(),
  arcadeTopUps: z.union([z.boolean(), z.lazy(() => ArcadeTopUpFindManySchema)]).optional(),
  arcadePrizes: z.union([z.boolean(), z.lazy(() => ArcadePrizeFindManySchema)]).optional(),
  arcadeSessions: z.union([z.boolean(), z.lazy(() => ArcadeSessionFindManySchema)]).optional(),
  arcadeRedemptions: z.union([z.boolean(), z.lazy(() => ArcadeRedemptionFindManySchema)]).optional(),
  providerGrants: z.union([z.boolean(), z.lazy(() => ProviderGrantFindManySchema)]).optional(),
  geoRouteCaches: z.union([z.boolean(), z.lazy(() => GeoRouteCacheFindManySchema)]).optional(),
  geoPoiCaches: z.union([z.boolean(), z.lazy(() => GeoPoiCacheFindManySchema)]).optional(),
  geoQueryCaches: z.union([z.boolean(), z.lazy(() => GeoQueryCacheFindManySchema)]).optional(),
  maptilerQueries: z.union([z.boolean(), z.lazy(() => MaptilerQueryFindManySchema)]).optional(),
  maptilerCacheEntries: z.union([z.boolean(), z.lazy(() => MaptilerCacheEntryFindManySchema)]).optional(),
  osrmCacheEntries: z.union([z.boolean(), z.lazy(() => OsrmCacheEntryFindManySchema)]).optional(),
  geoStatusLogs: z.union([z.boolean(), z.lazy(() => GeoStatusLogFindManySchema)]).optional(),
  geoDemTileCaches: z.union([z.boolean(), z.lazy(() => GeoDemTileCacheFindManySchema)]).optional(),
  personaAttributes: z.union([z.boolean(), z.lazy(() => PersonaAttributeFindManySchema)]).optional(),
  personaCompatibilities: z.union([z.boolean(), z.lazy(() => PersonaCompatibilityFindManySchema)]).optional(),
  geoViewHistories: z.union([z.boolean(), z.lazy(() => GeoViewHistoryFindManySchema)]).optional(),
  chatSessions: z.union([z.boolean(), z.lazy(() => ChatSessionFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const UserIncludeObjectSchema: z.ZodType<Prisma.UserInclude> = makeSchema() as unknown as z.ZodType<Prisma.UserInclude>;
export const UserIncludeObjectZodSchema = makeSchema();
