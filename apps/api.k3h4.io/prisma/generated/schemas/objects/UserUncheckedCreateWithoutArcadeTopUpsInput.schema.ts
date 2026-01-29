import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { RefreshTokenUncheckedCreateNestedManyWithoutUserInputObjectSchema as RefreshTokenUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './RefreshTokenUncheckedCreateNestedManyWithoutUserInput.schema';
import { UserPreferenceUncheckedCreateNestedOneWithoutUserInputObjectSchema as UserPreferenceUncheckedCreateNestedOneWithoutUserInputObjectSchema } from './UserPreferenceUncheckedCreateNestedOneWithoutUserInput.schema';
import { TelemetryEventUncheckedCreateNestedManyWithoutUserInputObjectSchema as TelemetryEventUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './TelemetryEventUncheckedCreateNestedManyWithoutUserInput.schema';
import { PersonaUncheckedCreateNestedManyWithoutUserInputObjectSchema as PersonaUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './PersonaUncheckedCreateNestedManyWithoutUserInput.schema';
import { AssignmentUncheckedCreateNestedManyWithoutUserInputObjectSchema as AssignmentUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './AssignmentUncheckedCreateNestedManyWithoutUserInput.schema';
import { StaffingEngagementUncheckedCreateNestedManyWithoutUserInputObjectSchema as StaffingEngagementUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './StaffingEngagementUncheckedCreateNestedManyWithoutUserInput.schema';
import { StaffingRoleUncheckedCreateNestedManyWithoutUserInputObjectSchema as StaffingRoleUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './StaffingRoleUncheckedCreateNestedManyWithoutUserInput.schema';
import { StaffingCandidateUncheckedCreateNestedManyWithoutUserInputObjectSchema as StaffingCandidateUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './StaffingCandidateUncheckedCreateNestedManyWithoutUserInput.schema';
import { StaffingShiftUncheckedCreateNestedManyWithoutUserInputObjectSchema as StaffingShiftUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './StaffingShiftUncheckedCreateNestedManyWithoutUserInput.schema';
import { StaffingPlacementUncheckedCreateNestedManyWithoutUserInputObjectSchema as StaffingPlacementUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './StaffingPlacementUncheckedCreateNestedManyWithoutUserInput.schema';
import { FreightLoadUncheckedCreateNestedManyWithoutUserInputObjectSchema as FreightLoadUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './FreightLoadUncheckedCreateNestedManyWithoutUserInput.schema';
import { WarehouseItemUncheckedCreateNestedManyWithoutUserInputObjectSchema as WarehouseItemUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './WarehouseItemUncheckedCreateNestedManyWithoutUserInput.schema';
import { PosStoreUncheckedCreateNestedManyWithoutUserInputObjectSchema as PosStoreUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './PosStoreUncheckedCreateNestedManyWithoutUserInput.schema';
import { PosTicketUncheckedCreateNestedManyWithoutUserInputObjectSchema as PosTicketUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './PosTicketUncheckedCreateNestedManyWithoutUserInput.schema';
import { AgriculturePlotUncheckedCreateNestedManyWithoutUserInputObjectSchema as AgriculturePlotUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './AgriculturePlotUncheckedCreateNestedManyWithoutUserInput.schema';
import { AgricultureTaskUncheckedCreateNestedManyWithoutUserInputObjectSchema as AgricultureTaskUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './AgricultureTaskUncheckedCreateNestedManyWithoutUserInput.schema';
import { AgricultureShipmentUncheckedCreateNestedManyWithoutUserInputObjectSchema as AgricultureShipmentUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './AgricultureShipmentUncheckedCreateNestedManyWithoutUserInput.schema';
import { AgricultureCropPlanUncheckedCreateNestedManyWithoutUserInputObjectSchema as AgricultureCropPlanUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './AgricultureCropPlanUncheckedCreateNestedManyWithoutUserInput.schema';
import { AgriculturePlotConditionUncheckedCreateNestedManyWithoutUserInputObjectSchema as AgriculturePlotConditionUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './AgriculturePlotConditionUncheckedCreateNestedManyWithoutUserInput.schema';
import { AgricultureInventoryUncheckedCreateNestedManyWithoutUserInputObjectSchema as AgricultureInventoryUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './AgricultureInventoryUncheckedCreateNestedManyWithoutUserInput.schema';
import { AgricultureInventoryMovementUncheckedCreateNestedManyWithoutUserInputObjectSchema as AgricultureInventoryMovementUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './AgricultureInventoryMovementUncheckedCreateNestedManyWithoutUserInput.schema';
import { AgricultureSlotUncheckedCreateNestedManyWithoutUserInputObjectSchema as AgricultureSlotUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './AgricultureSlotUncheckedCreateNestedManyWithoutUserInput.schema';
import { CulinaryMenuItemUncheckedCreateNestedManyWithoutUserInputObjectSchema as CulinaryMenuItemUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './CulinaryMenuItemUncheckedCreateNestedManyWithoutUserInput.schema';
import { CulinaryPrepTaskUncheckedCreateNestedManyWithoutUserInputObjectSchema as CulinaryPrepTaskUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './CulinaryPrepTaskUncheckedCreateNestedManyWithoutUserInput.schema';
import { CulinarySupplierNeedUncheckedCreateNestedManyWithoutUserInputObjectSchema as CulinarySupplierNeedUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './CulinarySupplierNeedUncheckedCreateNestedManyWithoutUserInput.schema';
import { ArcadeMachineUncheckedCreateNestedManyWithoutUserInputObjectSchema as ArcadeMachineUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './ArcadeMachineUncheckedCreateNestedManyWithoutUserInput.schema';
import { ArcadeCardUncheckedCreateNestedManyWithoutUserInputObjectSchema as ArcadeCardUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './ArcadeCardUncheckedCreateNestedManyWithoutUserInput.schema';
import { ArcadePrizeUncheckedCreateNestedManyWithoutUserInputObjectSchema as ArcadePrizeUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './ArcadePrizeUncheckedCreateNestedManyWithoutUserInput.schema';
import { ArcadeSessionUncheckedCreateNestedManyWithoutUserInputObjectSchema as ArcadeSessionUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './ArcadeSessionUncheckedCreateNestedManyWithoutUserInput.schema';
import { ArcadeRedemptionUncheckedCreateNestedManyWithoutUserInputObjectSchema as ArcadeRedemptionUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './ArcadeRedemptionUncheckedCreateNestedManyWithoutUserInput.schema';
import { ProviderGrantUncheckedCreateNestedManyWithoutUserInputObjectSchema as ProviderGrantUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './ProviderGrantUncheckedCreateNestedManyWithoutUserInput.schema';
import { GeoRouteCacheUncheckedCreateNestedManyWithoutUserInputObjectSchema as GeoRouteCacheUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './GeoRouteCacheUncheckedCreateNestedManyWithoutUserInput.schema';
import { GeoDirectionUncheckedCreateNestedManyWithoutUserInputObjectSchema as GeoDirectionUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './GeoDirectionUncheckedCreateNestedManyWithoutUserInput.schema';
import { GeoPoiCacheUncheckedCreateNestedManyWithoutUserInputObjectSchema as GeoPoiCacheUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './GeoPoiCacheUncheckedCreateNestedManyWithoutUserInput.schema';
import { GeoQueryCacheUncheckedCreateNestedManyWithoutUserInputObjectSchema as GeoQueryCacheUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './GeoQueryCacheUncheckedCreateNestedManyWithoutUserInput.schema';
import { MaptilerQueryUncheckedCreateNestedManyWithoutUserInputObjectSchema as MaptilerQueryUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './MaptilerQueryUncheckedCreateNestedManyWithoutUserInput.schema';
import { MaptilerCacheEntryUncheckedCreateNestedManyWithoutUserInputObjectSchema as MaptilerCacheEntryUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './MaptilerCacheEntryUncheckedCreateNestedManyWithoutUserInput.schema';
import { OsrmCacheEntryUncheckedCreateNestedManyWithoutUserInputObjectSchema as OsrmCacheEntryUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './OsrmCacheEntryUncheckedCreateNestedManyWithoutUserInput.schema';
import { GeoStatusLogUncheckedCreateNestedManyWithoutUserInputObjectSchema as GeoStatusLogUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './GeoStatusLogUncheckedCreateNestedManyWithoutUserInput.schema';
import { GeoDemTileCacheUncheckedCreateNestedManyWithoutUserInputObjectSchema as GeoDemTileCacheUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './GeoDemTileCacheUncheckedCreateNestedManyWithoutUserInput.schema';
import { PersonaAttributeUncheckedCreateNestedManyWithoutUserInputObjectSchema as PersonaAttributeUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './PersonaAttributeUncheckedCreateNestedManyWithoutUserInput.schema';
import { PersonaCompatibilityUncheckedCreateNestedManyWithoutUserInputObjectSchema as PersonaCompatibilityUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './PersonaCompatibilityUncheckedCreateNestedManyWithoutUserInput.schema';
import { GeoViewHistoryUncheckedCreateNestedManyWithoutUserInputObjectSchema as GeoViewHistoryUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './GeoViewHistoryUncheckedCreateNestedManyWithoutUserInput.schema';
import { ChatSessionUncheckedCreateNestedManyWithoutUserInputObjectSchema as ChatSessionUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './ChatSessionUncheckedCreateNestedManyWithoutUserInput.schema';
import { AiInsightUncheckedCreateNestedManyWithoutUserInputObjectSchema as AiInsightUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './AiInsightUncheckedCreateNestedManyWithoutUserInput.schema';
import { OllamaOperationUncheckedCreateNestedManyWithoutUserInputObjectSchema as OllamaOperationUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './OllamaOperationUncheckedCreateNestedManyWithoutUserInput.schema';
import { ActorUncheckedCreateNestedManyWithoutUserInputObjectSchema as ActorUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './ActorUncheckedCreateNestedManyWithoutUserInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  email: z.string(),
  provider: z.string(),
  providerId: z.string(),
  k3h4CoinBalance: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'k3h4CoinBalance' must be a Decimal",
}).optional(),
  displayName: z.string().optional().nullable(),
  avatarUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  refreshTokens: z.lazy(() => RefreshTokenUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  preference: z.lazy(() => UserPreferenceUncheckedCreateNestedOneWithoutUserInputObjectSchema).optional(),
  telemetry: z.lazy(() => TelemetryEventUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  personas: z.lazy(() => PersonaUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  assignments: z.lazy(() => AssignmentUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  staffingEngagements: z.lazy(() => StaffingEngagementUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  staffingRoles: z.lazy(() => StaffingRoleUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  staffingCandidates: z.lazy(() => StaffingCandidateUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  staffingShifts: z.lazy(() => StaffingShiftUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  staffingPlacements: z.lazy(() => StaffingPlacementUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  freightLoads: z.lazy(() => FreightLoadUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  warehouseItems: z.lazy(() => WarehouseItemUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  posStores: z.lazy(() => PosStoreUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  posTickets: z.lazy(() => PosTicketUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  agriculturePlots: z.lazy(() => AgriculturePlotUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  agricultureTasks: z.lazy(() => AgricultureTaskUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  agricultureShipments: z.lazy(() => AgricultureShipmentUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  agricultureCropPlans: z.lazy(() => AgricultureCropPlanUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  agriculturePlotConditions: z.lazy(() => AgriculturePlotConditionUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  agricultureInventories: z.lazy(() => AgricultureInventoryUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  agricultureInventoryMovements: z.lazy(() => AgricultureInventoryMovementUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  agricultureSlots: z.lazy(() => AgricultureSlotUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  culinaryMenuItems: z.lazy(() => CulinaryMenuItemUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  culinaryPrepTasks: z.lazy(() => CulinaryPrepTaskUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  culinarySupplierNeeds: z.lazy(() => CulinarySupplierNeedUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  arcadeMachines: z.lazy(() => ArcadeMachineUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  arcadeCards: z.lazy(() => ArcadeCardUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  arcadePrizes: z.lazy(() => ArcadePrizeUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  arcadeSessions: z.lazy(() => ArcadeSessionUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  arcadeRedemptions: z.lazy(() => ArcadeRedemptionUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  providerGrants: z.lazy(() => ProviderGrantUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  geoRouteCaches: z.lazy(() => GeoRouteCacheUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  geoDirections: z.lazy(() => GeoDirectionUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  geoPoiCaches: z.lazy(() => GeoPoiCacheUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  geoQueryCaches: z.lazy(() => GeoQueryCacheUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  maptilerQueries: z.lazy(() => MaptilerQueryUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  maptilerCacheEntries: z.lazy(() => MaptilerCacheEntryUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  osrmCacheEntries: z.lazy(() => OsrmCacheEntryUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  geoStatusLogs: z.lazy(() => GeoStatusLogUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  geoDemTileCaches: z.lazy(() => GeoDemTileCacheUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  personaAttributes: z.lazy(() => PersonaAttributeUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  personaCompatibilities: z.lazy(() => PersonaCompatibilityUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  geoViewHistories: z.lazy(() => GeoViewHistoryUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  chatSessions: z.lazy(() => ChatSessionUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  aiInsights: z.lazy(() => AiInsightUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  ollamaOperations: z.lazy(() => OllamaOperationUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  actors: z.lazy(() => ActorUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional()
}).strict();
export const UserUncheckedCreateWithoutArcadeTopUpsInputObjectSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutArcadeTopUpsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUncheckedCreateWithoutArcadeTopUpsInput>;
export const UserUncheckedCreateWithoutArcadeTopUpsInputObjectZodSchema = makeSchema();
