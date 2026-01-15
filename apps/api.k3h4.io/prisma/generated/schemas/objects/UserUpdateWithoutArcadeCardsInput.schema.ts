import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { DecimalFieldUpdateOperationsInputObjectSchema as DecimalFieldUpdateOperationsInputObjectSchema } from './DecimalFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { RefreshTokenUpdateManyWithoutUserNestedInputObjectSchema as RefreshTokenUpdateManyWithoutUserNestedInputObjectSchema } from './RefreshTokenUpdateManyWithoutUserNestedInput.schema';
import { UserPreferenceUpdateOneWithoutUserNestedInputObjectSchema as UserPreferenceUpdateOneWithoutUserNestedInputObjectSchema } from './UserPreferenceUpdateOneWithoutUserNestedInput.schema';
import { TelemetryEventUpdateManyWithoutUserNestedInputObjectSchema as TelemetryEventUpdateManyWithoutUserNestedInputObjectSchema } from './TelemetryEventUpdateManyWithoutUserNestedInput.schema';
import { BankTransactionUpdateManyWithoutUserNestedInputObjectSchema as BankTransactionUpdateManyWithoutUserNestedInputObjectSchema } from './BankTransactionUpdateManyWithoutUserNestedInput.schema';
import { PersonaUpdateManyWithoutUserNestedInputObjectSchema as PersonaUpdateManyWithoutUserNestedInputObjectSchema } from './PersonaUpdateManyWithoutUserNestedInput.schema';
import { AssignmentUpdateManyWithoutUserNestedInputObjectSchema as AssignmentUpdateManyWithoutUserNestedInputObjectSchema } from './AssignmentUpdateManyWithoutUserNestedInput.schema';
import { StaffingEngagementUpdateManyWithoutUserNestedInputObjectSchema as StaffingEngagementUpdateManyWithoutUserNestedInputObjectSchema } from './StaffingEngagementUpdateManyWithoutUserNestedInput.schema';
import { StaffingRoleUpdateManyWithoutUserNestedInputObjectSchema as StaffingRoleUpdateManyWithoutUserNestedInputObjectSchema } from './StaffingRoleUpdateManyWithoutUserNestedInput.schema';
import { StaffingCandidateUpdateManyWithoutUserNestedInputObjectSchema as StaffingCandidateUpdateManyWithoutUserNestedInputObjectSchema } from './StaffingCandidateUpdateManyWithoutUserNestedInput.schema';
import { StaffingShiftUpdateManyWithoutUserNestedInputObjectSchema as StaffingShiftUpdateManyWithoutUserNestedInputObjectSchema } from './StaffingShiftUpdateManyWithoutUserNestedInput.schema';
import { StaffingPlacementUpdateManyWithoutUserNestedInputObjectSchema as StaffingPlacementUpdateManyWithoutUserNestedInputObjectSchema } from './StaffingPlacementUpdateManyWithoutUserNestedInput.schema';
import { FreightLoadUpdateManyWithoutUserNestedInputObjectSchema as FreightLoadUpdateManyWithoutUserNestedInputObjectSchema } from './FreightLoadUpdateManyWithoutUserNestedInput.schema';
import { WarehouseItemUpdateManyWithoutUserNestedInputObjectSchema as WarehouseItemUpdateManyWithoutUserNestedInputObjectSchema } from './WarehouseItemUpdateManyWithoutUserNestedInput.schema';
import { PosStoreUpdateManyWithoutUserNestedInputObjectSchema as PosStoreUpdateManyWithoutUserNestedInputObjectSchema } from './PosStoreUpdateManyWithoutUserNestedInput.schema';
import { PosTicketUpdateManyWithoutUserNestedInputObjectSchema as PosTicketUpdateManyWithoutUserNestedInputObjectSchema } from './PosTicketUpdateManyWithoutUserNestedInput.schema';
import { AgriculturePlotUpdateManyWithoutUserNestedInputObjectSchema as AgriculturePlotUpdateManyWithoutUserNestedInputObjectSchema } from './AgriculturePlotUpdateManyWithoutUserNestedInput.schema';
import { AgricultureTaskUpdateManyWithoutUserNestedInputObjectSchema as AgricultureTaskUpdateManyWithoutUserNestedInputObjectSchema } from './AgricultureTaskUpdateManyWithoutUserNestedInput.schema';
import { AgricultureShipmentUpdateManyWithoutUserNestedInputObjectSchema as AgricultureShipmentUpdateManyWithoutUserNestedInputObjectSchema } from './AgricultureShipmentUpdateManyWithoutUserNestedInput.schema';
import { AgricultureCropPlanUpdateManyWithoutUserNestedInputObjectSchema as AgricultureCropPlanUpdateManyWithoutUserNestedInputObjectSchema } from './AgricultureCropPlanUpdateManyWithoutUserNestedInput.schema';
import { AgriculturePlotConditionUpdateManyWithoutUserNestedInputObjectSchema as AgriculturePlotConditionUpdateManyWithoutUserNestedInputObjectSchema } from './AgriculturePlotConditionUpdateManyWithoutUserNestedInput.schema';
import { AgricultureInventoryUpdateManyWithoutUserNestedInputObjectSchema as AgricultureInventoryUpdateManyWithoutUserNestedInputObjectSchema } from './AgricultureInventoryUpdateManyWithoutUserNestedInput.schema';
import { AgricultureInventoryMovementUpdateManyWithoutUserNestedInputObjectSchema as AgricultureInventoryMovementUpdateManyWithoutUserNestedInputObjectSchema } from './AgricultureInventoryMovementUpdateManyWithoutUserNestedInput.schema';
import { AgricultureSlotUpdateManyWithoutUserNestedInputObjectSchema as AgricultureSlotUpdateManyWithoutUserNestedInputObjectSchema } from './AgricultureSlotUpdateManyWithoutUserNestedInput.schema';
import { CulinaryMenuItemUpdateManyWithoutUserNestedInputObjectSchema as CulinaryMenuItemUpdateManyWithoutUserNestedInputObjectSchema } from './CulinaryMenuItemUpdateManyWithoutUserNestedInput.schema';
import { CulinaryPrepTaskUpdateManyWithoutUserNestedInputObjectSchema as CulinaryPrepTaskUpdateManyWithoutUserNestedInputObjectSchema } from './CulinaryPrepTaskUpdateManyWithoutUserNestedInput.schema';
import { CulinarySupplierNeedUpdateManyWithoutUserNestedInputObjectSchema as CulinarySupplierNeedUpdateManyWithoutUserNestedInputObjectSchema } from './CulinarySupplierNeedUpdateManyWithoutUserNestedInput.schema';
import { ArcadeMachineUpdateManyWithoutUserNestedInputObjectSchema as ArcadeMachineUpdateManyWithoutUserNestedInputObjectSchema } from './ArcadeMachineUpdateManyWithoutUserNestedInput.schema';
import { ArcadeTopUpUpdateManyWithoutUserNestedInputObjectSchema as ArcadeTopUpUpdateManyWithoutUserNestedInputObjectSchema } from './ArcadeTopUpUpdateManyWithoutUserNestedInput.schema';
import { ArcadePrizeUpdateManyWithoutUserNestedInputObjectSchema as ArcadePrizeUpdateManyWithoutUserNestedInputObjectSchema } from './ArcadePrizeUpdateManyWithoutUserNestedInput.schema';
import { ArcadeSessionUpdateManyWithoutUserNestedInputObjectSchema as ArcadeSessionUpdateManyWithoutUserNestedInputObjectSchema } from './ArcadeSessionUpdateManyWithoutUserNestedInput.schema';
import { ArcadeRedemptionUpdateManyWithoutUserNestedInputObjectSchema as ArcadeRedemptionUpdateManyWithoutUserNestedInputObjectSchema } from './ArcadeRedemptionUpdateManyWithoutUserNestedInput.schema';
import { ProviderGrantUpdateManyWithoutUserNestedInputObjectSchema as ProviderGrantUpdateManyWithoutUserNestedInputObjectSchema } from './ProviderGrantUpdateManyWithoutUserNestedInput.schema';
import { PersonaAttributeUpdateManyWithoutUserNestedInputObjectSchema as PersonaAttributeUpdateManyWithoutUserNestedInputObjectSchema } from './PersonaAttributeUpdateManyWithoutUserNestedInput.schema';
import { PersonaCompatibilityUpdateManyWithoutUserNestedInputObjectSchema as PersonaCompatibilityUpdateManyWithoutUserNestedInputObjectSchema } from './PersonaCompatibilityUpdateManyWithoutUserNestedInput.schema'

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
  refreshTokens: z.lazy(() => RefreshTokenUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  preference: z.lazy(() => UserPreferenceUpdateOneWithoutUserNestedInputObjectSchema).optional(),
  telemetry: z.lazy(() => TelemetryEventUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  bankTransactions: z.lazy(() => BankTransactionUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  personas: z.lazy(() => PersonaUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  assignments: z.lazy(() => AssignmentUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  staffingEngagements: z.lazy(() => StaffingEngagementUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  staffingRoles: z.lazy(() => StaffingRoleUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  staffingCandidates: z.lazy(() => StaffingCandidateUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  staffingShifts: z.lazy(() => StaffingShiftUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  staffingPlacements: z.lazy(() => StaffingPlacementUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  freightLoads: z.lazy(() => FreightLoadUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  warehouseItems: z.lazy(() => WarehouseItemUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  posStores: z.lazy(() => PosStoreUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  posTickets: z.lazy(() => PosTicketUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  agriculturePlots: z.lazy(() => AgriculturePlotUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  agricultureTasks: z.lazy(() => AgricultureTaskUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  agricultureShipments: z.lazy(() => AgricultureShipmentUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  agricultureCropPlans: z.lazy(() => AgricultureCropPlanUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  agriculturePlotConditions: z.lazy(() => AgriculturePlotConditionUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  agricultureInventories: z.lazy(() => AgricultureInventoryUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  agricultureInventoryMovements: z.lazy(() => AgricultureInventoryMovementUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  agricultureSlots: z.lazy(() => AgricultureSlotUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  culinaryMenuItems: z.lazy(() => CulinaryMenuItemUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  culinaryPrepTasks: z.lazy(() => CulinaryPrepTaskUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  culinarySupplierNeeds: z.lazy(() => CulinarySupplierNeedUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  arcadeMachines: z.lazy(() => ArcadeMachineUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  arcadeTopUps: z.lazy(() => ArcadeTopUpUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  arcadePrizes: z.lazy(() => ArcadePrizeUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  arcadeSessions: z.lazy(() => ArcadeSessionUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  arcadeRedemptions: z.lazy(() => ArcadeRedemptionUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  providerGrants: z.lazy(() => ProviderGrantUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  personaAttributes: z.lazy(() => PersonaAttributeUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  personaCompatibilities: z.lazy(() => PersonaCompatibilityUpdateManyWithoutUserNestedInputObjectSchema).optional()
}).strict();
export const UserUpdateWithoutArcadeCardsInputObjectSchema: z.ZodType<Prisma.UserUpdateWithoutArcadeCardsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateWithoutArcadeCardsInput>;
export const UserUpdateWithoutArcadeCardsInputObjectZodSchema = makeSchema();
