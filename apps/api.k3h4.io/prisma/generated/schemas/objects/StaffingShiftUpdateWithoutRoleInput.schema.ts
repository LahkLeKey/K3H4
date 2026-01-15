import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { UserUpdateOneRequiredWithoutStaffingShiftsNestedInputObjectSchema as UserUpdateOneRequiredWithoutStaffingShiftsNestedInputObjectSchema } from './UserUpdateOneRequiredWithoutStaffingShiftsNestedInput.schema';
import { PersonaUpdateOneWithoutStaffingShiftsAssignedNestedInputObjectSchema as PersonaUpdateOneWithoutStaffingShiftsAssignedNestedInputObjectSchema } from './PersonaUpdateOneWithoutStaffingShiftsAssignedNestedInput.schema';
import { StaffingCandidateUpdateOneWithoutShiftsAssignedNestedInputObjectSchema as StaffingCandidateUpdateOneWithoutShiftsAssignedNestedInputObjectSchema } from './StaffingCandidateUpdateOneWithoutShiftsAssignedNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  location: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  startsAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  endsAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  status: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  coverageStatus: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  notes: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutStaffingShiftsNestedInputObjectSchema).optional(),
  assignedPersona: z.lazy(() => PersonaUpdateOneWithoutStaffingShiftsAssignedNestedInputObjectSchema).optional(),
  assignedCandidate: z.lazy(() => StaffingCandidateUpdateOneWithoutShiftsAssignedNestedInputObjectSchema).optional()
}).strict();
export const StaffingShiftUpdateWithoutRoleInputObjectSchema: z.ZodType<Prisma.StaffingShiftUpdateWithoutRoleInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingShiftUpdateWithoutRoleInput>;
export const StaffingShiftUpdateWithoutRoleInputObjectZodSchema = makeSchema();
