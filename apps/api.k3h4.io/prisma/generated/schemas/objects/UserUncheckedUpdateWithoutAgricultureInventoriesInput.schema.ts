import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { DecimalFieldUpdateOperationsInputObjectSchema as DecimalFieldUpdateOperationsInputObjectSchema } from './DecimalFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { RefreshTokenUncheckedUpdateManyWithoutUserNestedInputObjectSchema as RefreshTokenUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from './RefreshTokenUncheckedUpdateManyWithoutUserNestedInput.schema';
import { UserPreferenceUncheckedUpdateOneWithoutUserNestedInputObjectSchema as UserPreferenceUncheckedUpdateOneWithoutUserNestedInputObjectSchema } from './UserPreferenceUncheckedUpdateOneWithoutUserNestedInput.schema';
import { TelemetryEventUncheckedUpdateManyWithoutUserNestedInputObjectSchema as TelemetryEventUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from './TelemetryEventUncheckedUpdateManyWithoutUserNestedInput.schema';
import { BankTransactionUncheckedUpdateManyWithoutUserNestedInputObjectSchema as BankTransactionUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from './BankTransactionUncheckedUpdateManyWithoutUserNestedInput.schema';
import { PersonaUncheckedUpdateManyWithoutUserNestedInputObjectSchema as PersonaUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from './PersonaUncheckedUpdateManyWithoutUserNestedInput.schema';
import { AssignmentUncheckedUpdateManyWithoutUserNestedInputObjectSchema as AssignmentUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from './AssignmentUncheckedUpdateManyWithoutUserNestedInput.schema';
import { StaffingEngagementUncheckedUpdateManyWithoutUserNestedInputObjectSchema as StaffingEngagementUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from './StaffingEngagementUncheckedUpdateManyWithoutUserNestedInput.schema';
import { StaffingRoleUncheckedUpdateManyWithoutUserNestedInputObjectSchema as StaffingRoleUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from './StaffingRoleUncheckedUpdateManyWithoutUserNestedInput.schema';
import { StaffingCandidateUncheckedUpdateManyWithoutUserNestedInputObjectSchema as StaffingCandidateUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from './StaffingCandidateUncheckedUpdateManyWithoutUserNestedInput.schema';
import { StaffingShiftUncheckedUpdateManyWithoutUserNestedInputObjectSchema as StaffingShiftUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from './StaffingShiftUncheckedUpdateManyWithoutUserNestedInput.schema';
import { StaffingPlacementUncheckedUpdateManyWithoutUserNestedInputObjectSchema as StaffingPlacementUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from './StaffingPlacementUncheckedUpdateManyWithoutUserNestedInput.schema';
import { FreightLoadUncheckedUpdateManyWithoutUserNestedInputObjectSchema as FreightLoadUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from './FreightLoadUncheckedUpdateManyWithoutUserNestedInput.schema';
import { WarehouseItemUncheckedUpdateManyWithoutUserNestedInputObjectSchema as WarehouseItemUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from './WarehouseItemUncheckedUpdateManyWithoutUserNestedInput.schema';
import { PosStoreUncheckedUpdateManyWithoutUserNestedInputObjectSchema as PosStoreUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from './PosStoreUncheckedUpdateManyWithoutUserNestedInput.schema';
import { PosTicketUncheckedUpdateManyWithoutUserNestedInputObjectSchema as PosTicketUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from './PosTicketUncheckedUpdateManyWithoutUserNestedInput.schema';
import { AgriculturePlotUncheckedUpdateManyWithoutUserNestedInputObjectSchema as AgriculturePlotUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from './AgriculturePlotUncheckedUpdateManyWithoutUserNestedInput.schema';
import { AgricultureTaskUncheckedUpdateManyWithoutUserNestedInputObjectSchema as AgricultureTaskUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from './AgricultureTaskUncheckedUpdateManyWithoutUserNestedInput.schema';
import { AgricultureShipmentUncheckedUpdateManyWithoutUserNestedInputObjectSchema as AgricultureShipmentUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from './AgricultureShipmentUncheckedUpdateManyWithoutUserNestedInput.schema';
import { AgricultureCropPlanUncheckedUpdateManyWithoutUserNestedInputObjectSchema as AgricultureCropPlanUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from './AgricultureCropPlanUncheckedUpdateManyWithoutUserNestedInput.schema';
import { AgriculturePlotConditionUncheckedUpdateManyWithoutUserNestedInputObjectSchema as AgriculturePlotConditionUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from './AgriculturePlotConditionUncheckedUpdateManyWithoutUserNestedInput.schema';
import { AgricultureInventoryMovementUncheckedUpdateManyWithoutUserNestedInputObjectSchema as AgricultureInventoryMovementUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from './AgricultureInventoryMovementUncheckedUpdateManyWithoutUserNestedInput.schema';
import { AgricultureSlotUncheckedUpdateManyWithoutUserNestedInputObjectSchema as AgricultureSlotUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from './AgricultureSlotUncheckedUpdateManyWithoutUserNestedInput.schema';
import { CulinaryMenuItemUncheckedUpdateManyWithoutUserNestedInputObjectSchema as CulinaryMenuItemUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from './CulinaryMenuItemUncheckedUpdateManyWithoutUserNestedInput.schema';
import { CulinaryPrepTaskUncheckedUpdateManyWithoutUserNestedInputObjectSchema as CulinaryPrepTaskUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from './CulinaryPrepTaskUncheckedUpdateManyWithoutUserNestedInput.schema';
import { CulinarySupplierNeedUncheckedUpdateManyWithoutUserNestedInputObjectSchema as CulinarySupplierNeedUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from './CulinarySupplierNeedUncheckedUpdateManyWithoutUserNestedInput.schema';
import { ArcadeMachineUncheckedUpdateManyWithoutUserNestedInputObjectSchema as ArcadeMachineUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from './ArcadeMachineUncheckedUpdateManyWithoutUserNestedInput.schema';
import { ArcadeCardUncheckedUpdateManyWithoutUserNestedInputObjectSchema as ArcadeCardUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from './ArcadeCardUncheckedUpdateManyWithoutUserNestedInput.schema';
import { ArcadeTopUpUncheckedUpdateManyWithoutUserNestedInputObjectSchema as ArcadeTopUpUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from './ArcadeTopUpUncheckedUpdateManyWithoutUserNestedInput.schema';
import { ArcadePrizeUncheckedUpdateManyWithoutUserNestedInputObjectSchema as ArcadePrizeUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from './ArcadePrizeUncheckedUpdateManyWithoutUserNestedInput.schema';
import { ArcadeSessionUncheckedUpdateManyWithoutUserNestedInputObjectSchema as ArcadeSessionUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from './ArcadeSessionUncheckedUpdateManyWithoutUserNestedInput.schema';
import { ArcadeRedemptionUncheckedUpdateManyWithoutUserNestedInputObjectSchema as ArcadeRedemptionUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from './ArcadeRedemptionUncheckedUpdateManyWithoutUserNestedInput.schema';
import { ProviderGrantUncheckedUpdateManyWithoutUserNestedInputObjectSchema as ProviderGrantUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from './ProviderGrantUncheckedUpdateManyWithoutUserNestedInput.schema';
import { PersonaAttributeUncheckedUpdateManyWithoutUserNestedInputObjectSchema as PersonaAttributeUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from './PersonaAttributeUncheckedUpdateManyWithoutUserNestedInput.schema';
import { PersonaCompatibilityUncheckedUpdateManyWithoutUserNestedInputObjectSchema as PersonaCompatibilityUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from './PersonaCompatibilityUncheckedUpdateManyWithoutUserNestedInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  provider: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  providerId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  k3h4CoinBalance: z.union([z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'k3h4CoinBalance' must be a Decimal",
}), z.lazy(() => DecimalFieldUpdateOperationsInputObjectSchema)]).optional(),
  displayName: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  avatarUrl: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  refreshTokens: z.lazy(() => RefreshTokenUncheckedUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  preference: z.lazy(() => UserPreferenceUncheckedUpdateOneWithoutUserNestedInputObjectSchema).optional(),
  telemetry: z.lazy(() => TelemetryEventUncheckedUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  bankTransactions: z.lazy(() => BankTransactionUncheckedUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  personas: z.lazy(() => PersonaUncheckedUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  assignments: z.lazy(() => AssignmentUncheckedUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  staffingEngagements: z.lazy(() => StaffingEngagementUncheckedUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  staffingRoles: z.lazy(() => StaffingRoleUncheckedUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  staffingCandidates: z.lazy(() => StaffingCandidateUncheckedUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  staffingShifts: z.lazy(() => StaffingShiftUncheckedUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  staffingPlacements: z.lazy(() => StaffingPlacementUncheckedUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  freightLoads: z.lazy(() => FreightLoadUncheckedUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  warehouseItems: z.lazy(() => WarehouseItemUncheckedUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  posStores: z.lazy(() => PosStoreUncheckedUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  posTickets: z.lazy(() => PosTicketUncheckedUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  agriculturePlots: z.lazy(() => AgriculturePlotUncheckedUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  agricultureTasks: z.lazy(() => AgricultureTaskUncheckedUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  agricultureShipments: z.lazy(() => AgricultureShipmentUncheckedUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  agricultureCropPlans: z.lazy(() => AgricultureCropPlanUncheckedUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  agriculturePlotConditions: z.lazy(() => AgriculturePlotConditionUncheckedUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  agricultureInventoryMovements: z.lazy(() => AgricultureInventoryMovementUncheckedUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  agricultureSlots: z.lazy(() => AgricultureSlotUncheckedUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  culinaryMenuItems: z.lazy(() => CulinaryMenuItemUncheckedUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  culinaryPrepTasks: z.lazy(() => CulinaryPrepTaskUncheckedUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  culinarySupplierNeeds: z.lazy(() => CulinarySupplierNeedUncheckedUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  arcadeMachines: z.lazy(() => ArcadeMachineUncheckedUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  arcadeCards: z.lazy(() => ArcadeCardUncheckedUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  arcadeTopUps: z.lazy(() => ArcadeTopUpUncheckedUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  arcadePrizes: z.lazy(() => ArcadePrizeUncheckedUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  arcadeSessions: z.lazy(() => ArcadeSessionUncheckedUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  arcadeRedemptions: z.lazy(() => ArcadeRedemptionUncheckedUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  providerGrants: z.lazy(() => ProviderGrantUncheckedUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  personaAttributes: z.lazy(() => PersonaAttributeUncheckedUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  personaCompatibilities: z.lazy(() => PersonaCompatibilityUncheckedUpdateManyWithoutUserNestedInputObjectSchema).optional()
}).strict();
export const UserUncheckedUpdateWithoutAgricultureInventoriesInputObjectSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAgricultureInventoriesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUncheckedUpdateWithoutAgricultureInventoriesInput>;
export const UserUncheckedUpdateWithoutAgricultureInventoriesInputObjectZodSchema = makeSchema();
