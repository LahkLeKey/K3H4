import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { RefreshTokenOrderByRelationAggregateInputObjectSchema as RefreshTokenOrderByRelationAggregateInputObjectSchema } from './RefreshTokenOrderByRelationAggregateInput.schema';
import { UserPreferenceOrderByWithRelationInputObjectSchema as UserPreferenceOrderByWithRelationInputObjectSchema } from './UserPreferenceOrderByWithRelationInput.schema';
import { TelemetryEventOrderByRelationAggregateInputObjectSchema as TelemetryEventOrderByRelationAggregateInputObjectSchema } from './TelemetryEventOrderByRelationAggregateInput.schema';
import { BankTransactionOrderByRelationAggregateInputObjectSchema as BankTransactionOrderByRelationAggregateInputObjectSchema } from './BankTransactionOrderByRelationAggregateInput.schema';
import { PersonaOrderByRelationAggregateInputObjectSchema as PersonaOrderByRelationAggregateInputObjectSchema } from './PersonaOrderByRelationAggregateInput.schema';
import { AssignmentOrderByRelationAggregateInputObjectSchema as AssignmentOrderByRelationAggregateInputObjectSchema } from './AssignmentOrderByRelationAggregateInput.schema';
import { StaffingEngagementOrderByRelationAggregateInputObjectSchema as StaffingEngagementOrderByRelationAggregateInputObjectSchema } from './StaffingEngagementOrderByRelationAggregateInput.schema';
import { StaffingRoleOrderByRelationAggregateInputObjectSchema as StaffingRoleOrderByRelationAggregateInputObjectSchema } from './StaffingRoleOrderByRelationAggregateInput.schema';
import { StaffingCandidateOrderByRelationAggregateInputObjectSchema as StaffingCandidateOrderByRelationAggregateInputObjectSchema } from './StaffingCandidateOrderByRelationAggregateInput.schema';
import { StaffingShiftOrderByRelationAggregateInputObjectSchema as StaffingShiftOrderByRelationAggregateInputObjectSchema } from './StaffingShiftOrderByRelationAggregateInput.schema';
import { StaffingPlacementOrderByRelationAggregateInputObjectSchema as StaffingPlacementOrderByRelationAggregateInputObjectSchema } from './StaffingPlacementOrderByRelationAggregateInput.schema';
import { FreightLoadOrderByRelationAggregateInputObjectSchema as FreightLoadOrderByRelationAggregateInputObjectSchema } from './FreightLoadOrderByRelationAggregateInput.schema';
import { WarehouseItemOrderByRelationAggregateInputObjectSchema as WarehouseItemOrderByRelationAggregateInputObjectSchema } from './WarehouseItemOrderByRelationAggregateInput.schema';
import { PosStoreOrderByRelationAggregateInputObjectSchema as PosStoreOrderByRelationAggregateInputObjectSchema } from './PosStoreOrderByRelationAggregateInput.schema';
import { PosTicketOrderByRelationAggregateInputObjectSchema as PosTicketOrderByRelationAggregateInputObjectSchema } from './PosTicketOrderByRelationAggregateInput.schema';
import { AgriculturePlotOrderByRelationAggregateInputObjectSchema as AgriculturePlotOrderByRelationAggregateInputObjectSchema } from './AgriculturePlotOrderByRelationAggregateInput.schema';
import { AgricultureTaskOrderByRelationAggregateInputObjectSchema as AgricultureTaskOrderByRelationAggregateInputObjectSchema } from './AgricultureTaskOrderByRelationAggregateInput.schema';
import { AgricultureShipmentOrderByRelationAggregateInputObjectSchema as AgricultureShipmentOrderByRelationAggregateInputObjectSchema } from './AgricultureShipmentOrderByRelationAggregateInput.schema';
import { AgricultureCropPlanOrderByRelationAggregateInputObjectSchema as AgricultureCropPlanOrderByRelationAggregateInputObjectSchema } from './AgricultureCropPlanOrderByRelationAggregateInput.schema';
import { AgriculturePlotConditionOrderByRelationAggregateInputObjectSchema as AgriculturePlotConditionOrderByRelationAggregateInputObjectSchema } from './AgriculturePlotConditionOrderByRelationAggregateInput.schema';
import { AgricultureInventoryOrderByRelationAggregateInputObjectSchema as AgricultureInventoryOrderByRelationAggregateInputObjectSchema } from './AgricultureInventoryOrderByRelationAggregateInput.schema';
import { AgricultureInventoryMovementOrderByRelationAggregateInputObjectSchema as AgricultureInventoryMovementOrderByRelationAggregateInputObjectSchema } from './AgricultureInventoryMovementOrderByRelationAggregateInput.schema';
import { AgricultureSlotOrderByRelationAggregateInputObjectSchema as AgricultureSlotOrderByRelationAggregateInputObjectSchema } from './AgricultureSlotOrderByRelationAggregateInput.schema';
import { CulinaryMenuItemOrderByRelationAggregateInputObjectSchema as CulinaryMenuItemOrderByRelationAggregateInputObjectSchema } from './CulinaryMenuItemOrderByRelationAggregateInput.schema';
import { CulinaryPrepTaskOrderByRelationAggregateInputObjectSchema as CulinaryPrepTaskOrderByRelationAggregateInputObjectSchema } from './CulinaryPrepTaskOrderByRelationAggregateInput.schema';
import { CulinarySupplierNeedOrderByRelationAggregateInputObjectSchema as CulinarySupplierNeedOrderByRelationAggregateInputObjectSchema } from './CulinarySupplierNeedOrderByRelationAggregateInput.schema';
import { ArcadeMachineOrderByRelationAggregateInputObjectSchema as ArcadeMachineOrderByRelationAggregateInputObjectSchema } from './ArcadeMachineOrderByRelationAggregateInput.schema';
import { ArcadeCardOrderByRelationAggregateInputObjectSchema as ArcadeCardOrderByRelationAggregateInputObjectSchema } from './ArcadeCardOrderByRelationAggregateInput.schema';
import { ArcadeTopUpOrderByRelationAggregateInputObjectSchema as ArcadeTopUpOrderByRelationAggregateInputObjectSchema } from './ArcadeTopUpOrderByRelationAggregateInput.schema';
import { ArcadePrizeOrderByRelationAggregateInputObjectSchema as ArcadePrizeOrderByRelationAggregateInputObjectSchema } from './ArcadePrizeOrderByRelationAggregateInput.schema';
import { ArcadeSessionOrderByRelationAggregateInputObjectSchema as ArcadeSessionOrderByRelationAggregateInputObjectSchema } from './ArcadeSessionOrderByRelationAggregateInput.schema';
import { ArcadeRedemptionOrderByRelationAggregateInputObjectSchema as ArcadeRedemptionOrderByRelationAggregateInputObjectSchema } from './ArcadeRedemptionOrderByRelationAggregateInput.schema';
import { ProviderGrantOrderByRelationAggregateInputObjectSchema as ProviderGrantOrderByRelationAggregateInputObjectSchema } from './ProviderGrantOrderByRelationAggregateInput.schema';
import { GeoRouteCacheOrderByRelationAggregateInputObjectSchema as GeoRouteCacheOrderByRelationAggregateInputObjectSchema } from './GeoRouteCacheOrderByRelationAggregateInput.schema';
import { GeoPoiCacheOrderByRelationAggregateInputObjectSchema as GeoPoiCacheOrderByRelationAggregateInputObjectSchema } from './GeoPoiCacheOrderByRelationAggregateInput.schema';
import { GeoQueryCacheOrderByRelationAggregateInputObjectSchema as GeoQueryCacheOrderByRelationAggregateInputObjectSchema } from './GeoQueryCacheOrderByRelationAggregateInput.schema';
import { MaptilerQueryOrderByRelationAggregateInputObjectSchema as MaptilerQueryOrderByRelationAggregateInputObjectSchema } from './MaptilerQueryOrderByRelationAggregateInput.schema';
import { MaptilerCacheEntryOrderByRelationAggregateInputObjectSchema as MaptilerCacheEntryOrderByRelationAggregateInputObjectSchema } from './MaptilerCacheEntryOrderByRelationAggregateInput.schema';
import { OsrmCacheEntryOrderByRelationAggregateInputObjectSchema as OsrmCacheEntryOrderByRelationAggregateInputObjectSchema } from './OsrmCacheEntryOrderByRelationAggregateInput.schema';
import { GeoStatusLogOrderByRelationAggregateInputObjectSchema as GeoStatusLogOrderByRelationAggregateInputObjectSchema } from './GeoStatusLogOrderByRelationAggregateInput.schema';
import { GeoDemTileCacheOrderByRelationAggregateInputObjectSchema as GeoDemTileCacheOrderByRelationAggregateInputObjectSchema } from './GeoDemTileCacheOrderByRelationAggregateInput.schema';
import { PersonaAttributeOrderByRelationAggregateInputObjectSchema as PersonaAttributeOrderByRelationAggregateInputObjectSchema } from './PersonaAttributeOrderByRelationAggregateInput.schema';
import { PersonaCompatibilityOrderByRelationAggregateInputObjectSchema as PersonaCompatibilityOrderByRelationAggregateInputObjectSchema } from './PersonaCompatibilityOrderByRelationAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  email: SortOrderSchema.optional(),
  provider: SortOrderSchema.optional(),
  providerId: SortOrderSchema.optional(),
  k3h4CoinBalance: SortOrderSchema.optional(),
  displayName: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  avatarUrl: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  refreshTokens: z.lazy(() => RefreshTokenOrderByRelationAggregateInputObjectSchema).optional(),
  preference: z.lazy(() => UserPreferenceOrderByWithRelationInputObjectSchema).optional(),
  telemetry: z.lazy(() => TelemetryEventOrderByRelationAggregateInputObjectSchema).optional(),
  bankTransactions: z.lazy(() => BankTransactionOrderByRelationAggregateInputObjectSchema).optional(),
  personas: z.lazy(() => PersonaOrderByRelationAggregateInputObjectSchema).optional(),
  assignments: z.lazy(() => AssignmentOrderByRelationAggregateInputObjectSchema).optional(),
  staffingEngagements: z.lazy(() => StaffingEngagementOrderByRelationAggregateInputObjectSchema).optional(),
  staffingRoles: z.lazy(() => StaffingRoleOrderByRelationAggregateInputObjectSchema).optional(),
  staffingCandidates: z.lazy(() => StaffingCandidateOrderByRelationAggregateInputObjectSchema).optional(),
  staffingShifts: z.lazy(() => StaffingShiftOrderByRelationAggregateInputObjectSchema).optional(),
  staffingPlacements: z.lazy(() => StaffingPlacementOrderByRelationAggregateInputObjectSchema).optional(),
  freightLoads: z.lazy(() => FreightLoadOrderByRelationAggregateInputObjectSchema).optional(),
  warehouseItems: z.lazy(() => WarehouseItemOrderByRelationAggregateInputObjectSchema).optional(),
  posStores: z.lazy(() => PosStoreOrderByRelationAggregateInputObjectSchema).optional(),
  posTickets: z.lazy(() => PosTicketOrderByRelationAggregateInputObjectSchema).optional(),
  agriculturePlots: z.lazy(() => AgriculturePlotOrderByRelationAggregateInputObjectSchema).optional(),
  agricultureTasks: z.lazy(() => AgricultureTaskOrderByRelationAggregateInputObjectSchema).optional(),
  agricultureShipments: z.lazy(() => AgricultureShipmentOrderByRelationAggregateInputObjectSchema).optional(),
  agricultureCropPlans: z.lazy(() => AgricultureCropPlanOrderByRelationAggregateInputObjectSchema).optional(),
  agriculturePlotConditions: z.lazy(() => AgriculturePlotConditionOrderByRelationAggregateInputObjectSchema).optional(),
  agricultureInventories: z.lazy(() => AgricultureInventoryOrderByRelationAggregateInputObjectSchema).optional(),
  agricultureInventoryMovements: z.lazy(() => AgricultureInventoryMovementOrderByRelationAggregateInputObjectSchema).optional(),
  agricultureSlots: z.lazy(() => AgricultureSlotOrderByRelationAggregateInputObjectSchema).optional(),
  culinaryMenuItems: z.lazy(() => CulinaryMenuItemOrderByRelationAggregateInputObjectSchema).optional(),
  culinaryPrepTasks: z.lazy(() => CulinaryPrepTaskOrderByRelationAggregateInputObjectSchema).optional(),
  culinarySupplierNeeds: z.lazy(() => CulinarySupplierNeedOrderByRelationAggregateInputObjectSchema).optional(),
  arcadeMachines: z.lazy(() => ArcadeMachineOrderByRelationAggregateInputObjectSchema).optional(),
  arcadeCards: z.lazy(() => ArcadeCardOrderByRelationAggregateInputObjectSchema).optional(),
  arcadeTopUps: z.lazy(() => ArcadeTopUpOrderByRelationAggregateInputObjectSchema).optional(),
  arcadePrizes: z.lazy(() => ArcadePrizeOrderByRelationAggregateInputObjectSchema).optional(),
  arcadeSessions: z.lazy(() => ArcadeSessionOrderByRelationAggregateInputObjectSchema).optional(),
  arcadeRedemptions: z.lazy(() => ArcadeRedemptionOrderByRelationAggregateInputObjectSchema).optional(),
  providerGrants: z.lazy(() => ProviderGrantOrderByRelationAggregateInputObjectSchema).optional(),
  geoRouteCaches: z.lazy(() => GeoRouteCacheOrderByRelationAggregateInputObjectSchema).optional(),
  geoPoiCaches: z.lazy(() => GeoPoiCacheOrderByRelationAggregateInputObjectSchema).optional(),
  geoQueryCaches: z.lazy(() => GeoQueryCacheOrderByRelationAggregateInputObjectSchema).optional(),
  maptilerQueries: z.lazy(() => MaptilerQueryOrderByRelationAggregateInputObjectSchema).optional(),
  maptilerCacheEntries: z.lazy(() => MaptilerCacheEntryOrderByRelationAggregateInputObjectSchema).optional(),
  osrmCacheEntries: z.lazy(() => OsrmCacheEntryOrderByRelationAggregateInputObjectSchema).optional(),
  geoStatusLogs: z.lazy(() => GeoStatusLogOrderByRelationAggregateInputObjectSchema).optional(),
  geoDemTileCaches: z.lazy(() => GeoDemTileCacheOrderByRelationAggregateInputObjectSchema).optional(),
  personaAttributes: z.lazy(() => PersonaAttributeOrderByRelationAggregateInputObjectSchema).optional(),
  personaCompatibilities: z.lazy(() => PersonaCompatibilityOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const UserOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.UserOrderByWithRelationInput>;
export const UserOrderByWithRelationInputObjectZodSchema = makeSchema();
