import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { StaffingRoleUpdateOneWithoutShiftsNestedInputObjectSchema as StaffingRoleUpdateOneWithoutShiftsNestedInputObjectSchema } from './StaffingRoleUpdateOneWithoutShiftsNestedInput.schema';
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
  role: z.lazy(() => StaffingRoleUpdateOneWithoutShiftsNestedInputObjectSchema).optional(),
  assignedPersona: z.lazy(() => PersonaUpdateOneWithoutStaffingShiftsAssignedNestedInputObjectSchema).optional(),
  assignedCandidate: z.lazy(() => StaffingCandidateUpdateOneWithoutShiftsAssignedNestedInputObjectSchema).optional()
}).strict();
export const StaffingShiftUpdateWithoutUserInputObjectSchema: z.ZodType<Prisma.StaffingShiftUpdateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingShiftUpdateWithoutUserInput>;
export const StaffingShiftUpdateWithoutUserInputObjectZodSchema = makeSchema();
