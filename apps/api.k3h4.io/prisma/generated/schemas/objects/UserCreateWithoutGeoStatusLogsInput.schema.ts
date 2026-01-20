import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { RefreshTokenCreateNestedManyWithoutUserInputObjectSchema as RefreshTokenCreateNestedManyWithoutUserInputObjectSchema } from './RefreshTokenCreateNestedManyWithoutUserInput.schema';
import { UserPreferenceCreateNestedOneWithoutUserInputObjectSchema as UserPreferenceCreateNestedOneWithoutUserInputObjectSchema } from './UserPreferenceCreateNestedOneWithoutUserInput.schema';
import { TelemetryEventCreateNestedManyWithoutUserInputObjectSchema as TelemetryEventCreateNestedManyWithoutUserInputObjectSchema } from './TelemetryEventCreateNestedManyWithoutUserInput.schema';
import { BankTransactionCreateNestedManyWithoutUserInputObjectSchema as BankTransactionCreateNestedManyWithoutUserInputObjectSchema } from './BankTransactionCreateNestedManyWithoutUserInput.schema';
import { PersonaCreateNestedManyWithoutUserInputObjectSchema as PersonaCreateNestedManyWithoutUserInputObjectSchema } from './PersonaCreateNestedManyWithoutUserInput.schema';
import { AssignmentCreateNestedManyWithoutUserInputObjectSchema as AssignmentCreateNestedManyWithoutUserInputObjectSchema } from './AssignmentCreateNestedManyWithoutUserInput.schema';
import { StaffingEngagementCreateNestedManyWithoutUserInputObjectSchema as StaffingEngagementCreateNestedManyWithoutUserInputObjectSchema } from './StaffingEngagementCreateNestedManyWithoutUserInput.schema';
import { StaffingRoleCreateNestedManyWithoutUserInputObjectSchema as StaffingRoleCreateNestedManyWithoutUserInputObjectSchema } from './StaffingRoleCreateNestedManyWithoutUserInput.schema';
import { StaffingCandidateCreateNestedManyWithoutUserInputObjectSchema as StaffingCandidateCreateNestedManyWithoutUserInputObjectSchema } from './StaffingCandidateCreateNestedManyWithoutUserInput.schema';
import { StaffingShiftCreateNestedManyWithoutUserInputObjectSchema as StaffingShiftCreateNestedManyWithoutUserInputObjectSchema } from './StaffingShiftCreateNestedManyWithoutUserInput.schema';
import { StaffingPlacementCreateNestedManyWithoutUserInputObjectSchema as StaffingPlacementCreateNestedManyWithoutUserInputObjectSchema } from './StaffingPlacementCreateNestedManyWithoutUserInput.schema';
import { FreightLoadCreateNestedManyWithoutUserInputObjectSchema as FreightLoadCreateNestedManyWithoutUserInputObjectSchema } from './FreightLoadCreateNestedManyWithoutUserInput.schema';
import { WarehouseItemCreateNestedManyWithoutUserInputObjectSchema as WarehouseItemCreateNestedManyWithoutUserInputObjectSchema } from './WarehouseItemCreateNestedManyWithoutUserInput.schema';
import { PosStoreCreateNestedManyWithoutUserInputObjectSchema as PosStoreCreateNestedManyWithoutUserInputObjectSchema } from './PosStoreCreateNestedManyWithoutUserInput.schema';
import { PosTicketCreateNestedManyWithoutUserInputObjectSchema as PosTicketCreateNestedManyWithoutUserInputObjectSchema } from './PosTicketCreateNestedManyWithoutUserInput.schema';
import { AgriculturePlotCreateNestedManyWithoutUserInputObjectSchema as AgriculturePlotCreateNestedManyWithoutUserInputObjectSchema } from './AgriculturePlotCreateNestedManyWithoutUserInput.schema';
import { AgricultureTaskCreateNestedManyWithoutUserInputObjectSchema as AgricultureTaskCreateNestedManyWithoutUserInputObjectSchema } from './AgricultureTaskCreateNestedManyWithoutUserInput.schema';
import { AgricultureShipmentCreateNestedManyWithoutUserInputObjectSchema as AgricultureShipmentCreateNestedManyWithoutUserInputObjectSchema } from './AgricultureShipmentCreateNestedManyWithoutUserInput.schema';
import { AgricultureCropPlanCreateNestedManyWithoutUserInputObjectSchema as AgricultureCropPlanCreateNestedManyWithoutUserInputObjectSchema } from './AgricultureCropPlanCreateNestedManyWithoutUserInput.schema';
import { AgriculturePlotConditionCreateNestedManyWithoutUserInputObjectSchema as AgriculturePlotConditionCreateNestedManyWithoutUserInputObjectSchema } from './AgriculturePlotConditionCreateNestedManyWithoutUserInput.schema';
import { AgricultureInventoryCreateNestedManyWithoutUserInputObjectSchema as AgricultureInventoryCreateNestedManyWithoutUserInputObjectSchema } from './AgricultureInventoryCreateNestedManyWithoutUserInput.schema';
import { AgricultureInventoryMovementCreateNestedManyWithoutUserInputObjectSchema as AgricultureInventoryMovementCreateNestedManyWithoutUserInputObjectSchema } from './AgricultureInventoryMovementCreateNestedManyWithoutUserInput.schema';
import { AgricultureSlotCreateNestedManyWithoutUserInputObjectSchema as AgricultureSlotCreateNestedManyWithoutUserInputObjectSchema } from './AgricultureSlotCreateNestedManyWithoutUserInput.schema';
import { CulinaryMenuItemCreateNestedManyWithoutUserInputObjectSchema as CulinaryMenuItemCreateNestedManyWithoutUserInputObjectSchema } from './CulinaryMenuItemCreateNestedManyWithoutUserInput.schema';
import { CulinaryPrepTaskCreateNestedManyWithoutUserInputObjectSchema as CulinaryPrepTaskCreateNestedManyWithoutUserInputObjectSchema } from './CulinaryPrepTaskCreateNestedManyWithoutUserInput.schema';
import { CulinarySupplierNeedCreateNestedManyWithoutUserInputObjectSchema as CulinarySupplierNeedCreateNestedManyWithoutUserInputObjectSchema } from './CulinarySupplierNeedCreateNestedManyWithoutUserInput.schema';
import { ArcadeMachineCreateNestedManyWithoutUserInputObjectSchema as ArcadeMachineCreateNestedManyWithoutUserInputObjectSchema } from './ArcadeMachineCreateNestedManyWithoutUserInput.schema';
import { ArcadeCardCreateNestedManyWithoutUserInputObjectSchema as ArcadeCardCreateNestedManyWithoutUserInputObjectSchema } from './ArcadeCardCreateNestedManyWithoutUserInput.schema';
import { ArcadeTopUpCreateNestedManyWithoutUserInputObjectSchema as ArcadeTopUpCreateNestedManyWithoutUserInputObjectSchema } from './ArcadeTopUpCreateNestedManyWithoutUserInput.schema';
import { ArcadePrizeCreateNestedManyWithoutUserInputObjectSchema as ArcadePrizeCreateNestedManyWithoutUserInputObjectSchema } from './ArcadePrizeCreateNestedManyWithoutUserInput.schema';
import { ArcadeSessionCreateNestedManyWithoutUserInputObjectSchema as ArcadeSessionCreateNestedManyWithoutUserInputObjectSchema } from './ArcadeSessionCreateNestedManyWithoutUserInput.schema';
import { ArcadeRedemptionCreateNestedManyWithoutUserInputObjectSchema as ArcadeRedemptionCreateNestedManyWithoutUserInputObjectSchema } from './ArcadeRedemptionCreateNestedManyWithoutUserInput.schema';
import { ProviderGrantCreateNestedManyWithoutUserInputObjectSchema as ProviderGrantCreateNestedManyWithoutUserInputObjectSchema } from './ProviderGrantCreateNestedManyWithoutUserInput.schema';
import { GeoRouteCacheCreateNestedManyWithoutUserInputObjectSchema as GeoRouteCacheCreateNestedManyWithoutUserInputObjectSchema } from './GeoRouteCacheCreateNestedManyWithoutUserInput.schema';
import { GeoPoiCacheCreateNestedManyWithoutUserInputObjectSchema as GeoPoiCacheCreateNestedManyWithoutUserInputObjectSchema } from './GeoPoiCacheCreateNestedManyWithoutUserInput.schema';
import { GeoQueryCacheCreateNestedManyWithoutUserInputObjectSchema as GeoQueryCacheCreateNestedManyWithoutUserInputObjectSchema } from './GeoQueryCacheCreateNestedManyWithoutUserInput.schema';
import { MaptilerQueryCreateNestedManyWithoutUserInputObjectSchema as MaptilerQueryCreateNestedManyWithoutUserInputObjectSchema } from './MaptilerQueryCreateNestedManyWithoutUserInput.schema';
import { MaptilerCacheEntryCreateNestedManyWithoutUserInputObjectSchema as MaptilerCacheEntryCreateNestedManyWithoutUserInputObjectSchema } from './MaptilerCacheEntryCreateNestedManyWithoutUserInput.schema';
import { OsrmCacheEntryCreateNestedManyWithoutUserInputObjectSchema as OsrmCacheEntryCreateNestedManyWithoutUserInputObjectSchema } from './OsrmCacheEntryCreateNestedManyWithoutUserInput.schema';
import { GeoDemTileCacheCreateNestedManyWithoutUserInputObjectSchema as GeoDemTileCacheCreateNestedManyWithoutUserInputObjectSchema } from './GeoDemTileCacheCreateNestedManyWithoutUserInput.schema';
import { PersonaAttributeCreateNestedManyWithoutUserInputObjectSchema as PersonaAttributeCreateNestedManyWithoutUserInputObjectSchema } from './PersonaAttributeCreateNestedManyWithoutUserInput.schema';
import { PersonaCompatibilityCreateNestedManyWithoutUserInputObjectSchema as PersonaCompatibilityCreateNestedManyWithoutUserInputObjectSchema } from './PersonaCompatibilityCreateNestedManyWithoutUserInput.schema'

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
  refreshTokens: z.lazy(() => RefreshTokenCreateNestedManyWithoutUserInputObjectSchema).optional(),
  preference: z.lazy(() => UserPreferenceCreateNestedOneWithoutUserInputObjectSchema).optional(),
  telemetry: z.lazy(() => TelemetryEventCreateNestedManyWithoutUserInputObjectSchema).optional(),
  bankTransactions: z.lazy(() => BankTransactionCreateNestedManyWithoutUserInputObjectSchema).optional(),
  personas: z.lazy(() => PersonaCreateNestedManyWithoutUserInputObjectSchema).optional(),
  assignments: z.lazy(() => AssignmentCreateNestedManyWithoutUserInputObjectSchema).optional(),
  staffingEngagements: z.lazy(() => StaffingEngagementCreateNestedManyWithoutUserInputObjectSchema).optional(),
  staffingRoles: z.lazy(() => StaffingRoleCreateNestedManyWithoutUserInputObjectSchema).optional(),
  staffingCandidates: z.lazy(() => StaffingCandidateCreateNestedManyWithoutUserInputObjectSchema).optional(),
  staffingShifts: z.lazy(() => StaffingShiftCreateNestedManyWithoutUserInputObjectSchema).optional(),
  staffingPlacements: z.lazy(() => StaffingPlacementCreateNestedManyWithoutUserInputObjectSchema).optional(),
  freightLoads: z.lazy(() => FreightLoadCreateNestedManyWithoutUserInputObjectSchema).optional(),
  warehouseItems: z.lazy(() => WarehouseItemCreateNestedManyWithoutUserInputObjectSchema).optional(),
  posStores: z.lazy(() => PosStoreCreateNestedManyWithoutUserInputObjectSchema).optional(),
  posTickets: z.lazy(() => PosTicketCreateNestedManyWithoutUserInputObjectSchema).optional(),
  agriculturePlots: z.lazy(() => AgriculturePlotCreateNestedManyWithoutUserInputObjectSchema).optional(),
  agricultureTasks: z.lazy(() => AgricultureTaskCreateNestedManyWithoutUserInputObjectSchema).optional(),
  agricultureShipments: z.lazy(() => AgricultureShipmentCreateNestedManyWithoutUserInputObjectSchema).optional(),
  agricultureCropPlans: z.lazy(() => AgricultureCropPlanCreateNestedManyWithoutUserInputObjectSchema).optional(),
  agriculturePlotConditions: z.lazy(() => AgriculturePlotConditionCreateNestedManyWithoutUserInputObjectSchema).optional(),
  agricultureInventories: z.lazy(() => AgricultureInventoryCreateNestedManyWithoutUserInputObjectSchema).optional(),
  agricultureInventoryMovements: z.lazy(() => AgricultureInventoryMovementCreateNestedManyWithoutUserInputObjectSchema).optional(),
  agricultureSlots: z.lazy(() => AgricultureSlotCreateNestedManyWithoutUserInputObjectSchema).optional(),
  culinaryMenuItems: z.lazy(() => CulinaryMenuItemCreateNestedManyWithoutUserInputObjectSchema).optional(),
  culinaryPrepTasks: z.lazy(() => CulinaryPrepTaskCreateNestedManyWithoutUserInputObjectSchema).optional(),
  culinarySupplierNeeds: z.lazy(() => CulinarySupplierNeedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  arcadeMachines: z.lazy(() => ArcadeMachineCreateNestedManyWithoutUserInputObjectSchema).optional(),
  arcadeCards: z.lazy(() => ArcadeCardCreateNestedManyWithoutUserInputObjectSchema).optional(),
  arcadeTopUps: z.lazy(() => ArcadeTopUpCreateNestedManyWithoutUserInputObjectSchema).optional(),
  arcadePrizes: z.lazy(() => ArcadePrizeCreateNestedManyWithoutUserInputObjectSchema).optional(),
  arcadeSessions: z.lazy(() => ArcadeSessionCreateNestedManyWithoutUserInputObjectSchema).optional(),
  arcadeRedemptions: z.lazy(() => ArcadeRedemptionCreateNestedManyWithoutUserInputObjectSchema).optional(),
  providerGrants: z.lazy(() => ProviderGrantCreateNestedManyWithoutUserInputObjectSchema).optional(),
  geoRouteCaches: z.lazy(() => GeoRouteCacheCreateNestedManyWithoutUserInputObjectSchema).optional(),
  geoPoiCaches: z.lazy(() => GeoPoiCacheCreateNestedManyWithoutUserInputObjectSchema).optional(),
  geoQueryCaches: z.lazy(() => GeoQueryCacheCreateNestedManyWithoutUserInputObjectSchema).optional(),
  maptilerQueries: z.lazy(() => MaptilerQueryCreateNestedManyWithoutUserInputObjectSchema).optional(),
  maptilerCacheEntries: z.lazy(() => MaptilerCacheEntryCreateNestedManyWithoutUserInputObjectSchema).optional(),
  osrmCacheEntries: z.lazy(() => OsrmCacheEntryCreateNestedManyWithoutUserInputObjectSchema).optional(),
  geoDemTileCaches: z.lazy(() => GeoDemTileCacheCreateNestedManyWithoutUserInputObjectSchema).optional(),
  personaAttributes: z.lazy(() => PersonaAttributeCreateNestedManyWithoutUserInputObjectSchema).optional(),
  personaCompatibilities: z.lazy(() => PersonaCompatibilityCreateNestedManyWithoutUserInputObjectSchema).optional()
}).strict();
export const UserCreateWithoutGeoStatusLogsInputObjectSchema: z.ZodType<Prisma.UserCreateWithoutGeoStatusLogsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateWithoutGeoStatusLogsInput>;
export const UserCreateWithoutGeoStatusLogsInputObjectZodSchema = makeSchema();
