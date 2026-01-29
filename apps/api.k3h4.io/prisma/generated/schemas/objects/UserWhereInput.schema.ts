import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { DecimalFilterObjectSchema as DecimalFilterObjectSchema } from './DecimalFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { RefreshTokenListRelationFilterObjectSchema as RefreshTokenListRelationFilterObjectSchema } from './RefreshTokenListRelationFilter.schema';
import { UserPreferenceNullableScalarRelationFilterObjectSchema as UserPreferenceNullableScalarRelationFilterObjectSchema } from './UserPreferenceNullableScalarRelationFilter.schema';
import { UserPreferenceWhereInputObjectSchema as UserPreferenceWhereInputObjectSchema } from './UserPreferenceWhereInput.schema';
import { TelemetryEventListRelationFilterObjectSchema as TelemetryEventListRelationFilterObjectSchema } from './TelemetryEventListRelationFilter.schema';
import { PersonaListRelationFilterObjectSchema as PersonaListRelationFilterObjectSchema } from './PersonaListRelationFilter.schema';
import { AssignmentListRelationFilterObjectSchema as AssignmentListRelationFilterObjectSchema } from './AssignmentListRelationFilter.schema';
import { StaffingEngagementListRelationFilterObjectSchema as StaffingEngagementListRelationFilterObjectSchema } from './StaffingEngagementListRelationFilter.schema';
import { StaffingRoleListRelationFilterObjectSchema as StaffingRoleListRelationFilterObjectSchema } from './StaffingRoleListRelationFilter.schema';
import { StaffingCandidateListRelationFilterObjectSchema as StaffingCandidateListRelationFilterObjectSchema } from './StaffingCandidateListRelationFilter.schema';
import { StaffingShiftListRelationFilterObjectSchema as StaffingShiftListRelationFilterObjectSchema } from './StaffingShiftListRelationFilter.schema';
import { StaffingPlacementListRelationFilterObjectSchema as StaffingPlacementListRelationFilterObjectSchema } from './StaffingPlacementListRelationFilter.schema';
import { FreightLoadListRelationFilterObjectSchema as FreightLoadListRelationFilterObjectSchema } from './FreightLoadListRelationFilter.schema';
import { WarehouseItemListRelationFilterObjectSchema as WarehouseItemListRelationFilterObjectSchema } from './WarehouseItemListRelationFilter.schema';
import { PosStoreListRelationFilterObjectSchema as PosStoreListRelationFilterObjectSchema } from './PosStoreListRelationFilter.schema';
import { PosTicketListRelationFilterObjectSchema as PosTicketListRelationFilterObjectSchema } from './PosTicketListRelationFilter.schema';
import { AgriculturePlotListRelationFilterObjectSchema as AgriculturePlotListRelationFilterObjectSchema } from './AgriculturePlotListRelationFilter.schema';
import { AgricultureTaskListRelationFilterObjectSchema as AgricultureTaskListRelationFilterObjectSchema } from './AgricultureTaskListRelationFilter.schema';
import { AgricultureShipmentListRelationFilterObjectSchema as AgricultureShipmentListRelationFilterObjectSchema } from './AgricultureShipmentListRelationFilter.schema';
import { AgricultureCropPlanListRelationFilterObjectSchema as AgricultureCropPlanListRelationFilterObjectSchema } from './AgricultureCropPlanListRelationFilter.schema';
import { AgriculturePlotConditionListRelationFilterObjectSchema as AgriculturePlotConditionListRelationFilterObjectSchema } from './AgriculturePlotConditionListRelationFilter.schema';
import { AgricultureInventoryListRelationFilterObjectSchema as AgricultureInventoryListRelationFilterObjectSchema } from './AgricultureInventoryListRelationFilter.schema';
import { AgricultureInventoryMovementListRelationFilterObjectSchema as AgricultureInventoryMovementListRelationFilterObjectSchema } from './AgricultureInventoryMovementListRelationFilter.schema';
import { AgricultureSlotListRelationFilterObjectSchema as AgricultureSlotListRelationFilterObjectSchema } from './AgricultureSlotListRelationFilter.schema';
import { CulinaryMenuItemListRelationFilterObjectSchema as CulinaryMenuItemListRelationFilterObjectSchema } from './CulinaryMenuItemListRelationFilter.schema';
import { CulinaryPrepTaskListRelationFilterObjectSchema as CulinaryPrepTaskListRelationFilterObjectSchema } from './CulinaryPrepTaskListRelationFilter.schema';
import { CulinarySupplierNeedListRelationFilterObjectSchema as CulinarySupplierNeedListRelationFilterObjectSchema } from './CulinarySupplierNeedListRelationFilter.schema';
import { ArcadeMachineListRelationFilterObjectSchema as ArcadeMachineListRelationFilterObjectSchema } from './ArcadeMachineListRelationFilter.schema';
import { ArcadeCardListRelationFilterObjectSchema as ArcadeCardListRelationFilterObjectSchema } from './ArcadeCardListRelationFilter.schema';
import { ArcadeTopUpListRelationFilterObjectSchema as ArcadeTopUpListRelationFilterObjectSchema } from './ArcadeTopUpListRelationFilter.schema';
import { ArcadePrizeListRelationFilterObjectSchema as ArcadePrizeListRelationFilterObjectSchema } from './ArcadePrizeListRelationFilter.schema';
import { ArcadeSessionListRelationFilterObjectSchema as ArcadeSessionListRelationFilterObjectSchema } from './ArcadeSessionListRelationFilter.schema';
import { ArcadeRedemptionListRelationFilterObjectSchema as ArcadeRedemptionListRelationFilterObjectSchema } from './ArcadeRedemptionListRelationFilter.schema';
import { ProviderGrantListRelationFilterObjectSchema as ProviderGrantListRelationFilterObjectSchema } from './ProviderGrantListRelationFilter.schema';
import { GeoRouteCacheListRelationFilterObjectSchema as GeoRouteCacheListRelationFilterObjectSchema } from './GeoRouteCacheListRelationFilter.schema';
import { GeoDirectionListRelationFilterObjectSchema as GeoDirectionListRelationFilterObjectSchema } from './GeoDirectionListRelationFilter.schema';
import { GeoPoiCacheListRelationFilterObjectSchema as GeoPoiCacheListRelationFilterObjectSchema } from './GeoPoiCacheListRelationFilter.schema';
import { GeoQueryCacheListRelationFilterObjectSchema as GeoQueryCacheListRelationFilterObjectSchema } from './GeoQueryCacheListRelationFilter.schema';
import { MaptilerQueryListRelationFilterObjectSchema as MaptilerQueryListRelationFilterObjectSchema } from './MaptilerQueryListRelationFilter.schema';
import { MaptilerCacheEntryListRelationFilterObjectSchema as MaptilerCacheEntryListRelationFilterObjectSchema } from './MaptilerCacheEntryListRelationFilter.schema';
import { OsrmCacheEntryListRelationFilterObjectSchema as OsrmCacheEntryListRelationFilterObjectSchema } from './OsrmCacheEntryListRelationFilter.schema';
import { GeoStatusLogListRelationFilterObjectSchema as GeoStatusLogListRelationFilterObjectSchema } from './GeoStatusLogListRelationFilter.schema';
import { GeoDemTileCacheListRelationFilterObjectSchema as GeoDemTileCacheListRelationFilterObjectSchema } from './GeoDemTileCacheListRelationFilter.schema';
import { PersonaAttributeListRelationFilterObjectSchema as PersonaAttributeListRelationFilterObjectSchema } from './PersonaAttributeListRelationFilter.schema';
import { PersonaCompatibilityListRelationFilterObjectSchema as PersonaCompatibilityListRelationFilterObjectSchema } from './PersonaCompatibilityListRelationFilter.schema';
import { GeoViewHistoryListRelationFilterObjectSchema as GeoViewHistoryListRelationFilterObjectSchema } from './GeoViewHistoryListRelationFilter.schema';
import { ChatSessionListRelationFilterObjectSchema as ChatSessionListRelationFilterObjectSchema } from './ChatSessionListRelationFilter.schema';
import { AiInsightListRelationFilterObjectSchema as AiInsightListRelationFilterObjectSchema } from './AiInsightListRelationFilter.schema';
import { OllamaOperationListRelationFilterObjectSchema as OllamaOperationListRelationFilterObjectSchema } from './OllamaOperationListRelationFilter.schema';
import { ActorListRelationFilterObjectSchema as ActorListRelationFilterObjectSchema } from './ActorListRelationFilter.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const userwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => UserWhereInputObjectSchema), z.lazy(() => UserWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => UserWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => UserWhereInputObjectSchema), z.lazy(() => UserWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  email: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  provider: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  providerId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  k3h4CoinBalance: z.union([z.lazy(() => DecimalFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'k3h4CoinBalance' must be a Decimal",
})]).optional(),
  displayName: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  avatarUrl: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  refreshTokens: z.lazy(() => RefreshTokenListRelationFilterObjectSchema).optional(),
  preference: z.union([z.lazy(() => UserPreferenceNullableScalarRelationFilterObjectSchema), z.lazy(() => UserPreferenceWhereInputObjectSchema)]).optional(),
  telemetry: z.lazy(() => TelemetryEventListRelationFilterObjectSchema).optional(),
  personas: z.lazy(() => PersonaListRelationFilterObjectSchema).optional(),
  assignments: z.lazy(() => AssignmentListRelationFilterObjectSchema).optional(),
  staffingEngagements: z.lazy(() => StaffingEngagementListRelationFilterObjectSchema).optional(),
  staffingRoles: z.lazy(() => StaffingRoleListRelationFilterObjectSchema).optional(),
  staffingCandidates: z.lazy(() => StaffingCandidateListRelationFilterObjectSchema).optional(),
  staffingShifts: z.lazy(() => StaffingShiftListRelationFilterObjectSchema).optional(),
  staffingPlacements: z.lazy(() => StaffingPlacementListRelationFilterObjectSchema).optional(),
  freightLoads: z.lazy(() => FreightLoadListRelationFilterObjectSchema).optional(),
  warehouseItems: z.lazy(() => WarehouseItemListRelationFilterObjectSchema).optional(),
  posStores: z.lazy(() => PosStoreListRelationFilterObjectSchema).optional(),
  posTickets: z.lazy(() => PosTicketListRelationFilterObjectSchema).optional(),
  agriculturePlots: z.lazy(() => AgriculturePlotListRelationFilterObjectSchema).optional(),
  agricultureTasks: z.lazy(() => AgricultureTaskListRelationFilterObjectSchema).optional(),
  agricultureShipments: z.lazy(() => AgricultureShipmentListRelationFilterObjectSchema).optional(),
  agricultureCropPlans: z.lazy(() => AgricultureCropPlanListRelationFilterObjectSchema).optional(),
  agriculturePlotConditions: z.lazy(() => AgriculturePlotConditionListRelationFilterObjectSchema).optional(),
  agricultureInventories: z.lazy(() => AgricultureInventoryListRelationFilterObjectSchema).optional(),
  agricultureInventoryMovements: z.lazy(() => AgricultureInventoryMovementListRelationFilterObjectSchema).optional(),
  agricultureSlots: z.lazy(() => AgricultureSlotListRelationFilterObjectSchema).optional(),
  culinaryMenuItems: z.lazy(() => CulinaryMenuItemListRelationFilterObjectSchema).optional(),
  culinaryPrepTasks: z.lazy(() => CulinaryPrepTaskListRelationFilterObjectSchema).optional(),
  culinarySupplierNeeds: z.lazy(() => CulinarySupplierNeedListRelationFilterObjectSchema).optional(),
  arcadeMachines: z.lazy(() => ArcadeMachineListRelationFilterObjectSchema).optional(),
  arcadeCards: z.lazy(() => ArcadeCardListRelationFilterObjectSchema).optional(),
  arcadeTopUps: z.lazy(() => ArcadeTopUpListRelationFilterObjectSchema).optional(),
  arcadePrizes: z.lazy(() => ArcadePrizeListRelationFilterObjectSchema).optional(),
  arcadeSessions: z.lazy(() => ArcadeSessionListRelationFilterObjectSchema).optional(),
  arcadeRedemptions: z.lazy(() => ArcadeRedemptionListRelationFilterObjectSchema).optional(),
  providerGrants: z.lazy(() => ProviderGrantListRelationFilterObjectSchema).optional(),
  geoRouteCaches: z.lazy(() => GeoRouteCacheListRelationFilterObjectSchema).optional(),
  geoDirections: z.lazy(() => GeoDirectionListRelationFilterObjectSchema).optional(),
  geoPoiCaches: z.lazy(() => GeoPoiCacheListRelationFilterObjectSchema).optional(),
  geoQueryCaches: z.lazy(() => GeoQueryCacheListRelationFilterObjectSchema).optional(),
  maptilerQueries: z.lazy(() => MaptilerQueryListRelationFilterObjectSchema).optional(),
  maptilerCacheEntries: z.lazy(() => MaptilerCacheEntryListRelationFilterObjectSchema).optional(),
  osrmCacheEntries: z.lazy(() => OsrmCacheEntryListRelationFilterObjectSchema).optional(),
  geoStatusLogs: z.lazy(() => GeoStatusLogListRelationFilterObjectSchema).optional(),
  geoDemTileCaches: z.lazy(() => GeoDemTileCacheListRelationFilterObjectSchema).optional(),
  personaAttributes: z.lazy(() => PersonaAttributeListRelationFilterObjectSchema).optional(),
  personaCompatibilities: z.lazy(() => PersonaCompatibilityListRelationFilterObjectSchema).optional(),
  geoViewHistories: z.lazy(() => GeoViewHistoryListRelationFilterObjectSchema).optional(),
  chatSessions: z.lazy(() => ChatSessionListRelationFilterObjectSchema).optional(),
  aiInsights: z.lazy(() => AiInsightListRelationFilterObjectSchema).optional(),
  ollamaOperations: z.lazy(() => OllamaOperationListRelationFilterObjectSchema).optional(),
  actors: z.lazy(() => ActorListRelationFilterObjectSchema).optional()
}).strict();
export const UserWhereInputObjectSchema: z.ZodType<Prisma.UserWhereInput> = userwhereinputSchema as unknown as z.ZodType<Prisma.UserWhereInput>;
export const UserWhereInputObjectZodSchema = userwhereinputSchema;
