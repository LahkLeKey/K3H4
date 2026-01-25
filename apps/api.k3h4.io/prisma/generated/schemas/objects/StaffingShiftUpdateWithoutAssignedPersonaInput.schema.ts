import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { LifecycleStatusSchema } from '../enums/LifecycleStatus.schema';
import { EnumLifecycleStatusFieldUpdateOperationsInputObjectSchema as EnumLifecycleStatusFieldUpdateOperationsInputObjectSchema } from './EnumLifecycleStatusFieldUpdateOperationsInput.schema';
import { CoverageStatusSchema } from '../enums/CoverageStatus.schema';
import { EnumCoverageStatusFieldUpdateOperationsInputObjectSchema as EnumCoverageStatusFieldUpdateOperationsInputObjectSchema } from './EnumCoverageStatusFieldUpdateOperationsInput.schema';
import { UserUpdateOneRequiredWithoutStaffingShiftsNestedInputObjectSchema as UserUpdateOneRequiredWithoutStaffingShiftsNestedInputObjectSchema } from './UserUpdateOneRequiredWithoutStaffingShiftsNestedInput.schema';
import { StaffingRoleUpdateOneWithoutShiftsNestedInputObjectSchema as StaffingRoleUpdateOneWithoutShiftsNestedInputObjectSchema } from './StaffingRoleUpdateOneWithoutShiftsNestedInput.schema';
import { StaffingCandidateUpdateOneWithoutShiftsAssignedNestedInputObjectSchema as StaffingCandidateUpdateOneWithoutShiftsAssignedNestedInputObjectSchema } from './StaffingCandidateUpdateOneWithoutShiftsAssignedNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  location: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  startsAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  endsAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  status: z.union([LifecycleStatusSchema, z.lazy(() => EnumLifecycleStatusFieldUpdateOperationsInputObjectSchema)]).optional(),
  coverageStatus: z.union([CoverageStatusSchema, z.lazy(() => EnumCoverageStatusFieldUpdateOperationsInputObjectSchema)]).optional(),
  notes: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutStaffingShiftsNestedInputObjectSchema).optional(),
  role: z.lazy(() => StaffingRoleUpdateOneWithoutShiftsNestedInputObjectSchema).optional(),
  assignedCandidate: z.lazy(() => StaffingCandidateUpdateOneWithoutShiftsAssignedNestedInputObjectSchema).optional()
}).strict();
export const StaffingShiftUpdateWithoutAssignedPersonaInputObjectSchema: z.ZodType<Prisma.StaffingShiftUpdateWithoutAssignedPersonaInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingShiftUpdateWithoutAssignedPersonaInput>;
export const StaffingShiftUpdateWithoutAssignedPersonaInputObjectZodSchema = makeSchema();
