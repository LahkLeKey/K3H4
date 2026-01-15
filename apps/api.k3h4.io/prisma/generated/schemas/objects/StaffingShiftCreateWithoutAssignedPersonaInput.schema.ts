import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateNestedOneWithoutStaffingShiftsInputObjectSchema as UserCreateNestedOneWithoutStaffingShiftsInputObjectSchema } from './UserCreateNestedOneWithoutStaffingShiftsInput.schema';
import { StaffingRoleCreateNestedOneWithoutShiftsInputObjectSchema as StaffingRoleCreateNestedOneWithoutShiftsInputObjectSchema } from './StaffingRoleCreateNestedOneWithoutShiftsInput.schema';
import { StaffingCandidateCreateNestedOneWithoutShiftsAssignedInputObjectSchema as StaffingCandidateCreateNestedOneWithoutShiftsAssignedInputObjectSchema } from './StaffingCandidateCreateNestedOneWithoutShiftsAssignedInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  title: z.string(),
  location: z.string().optional().nullable(),
  startsAt: z.coerce.date(),
  endsAt: z.coerce.date(),
  status: z.string().optional(),
  coverageStatus: z.string().optional(),
  notes: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutStaffingShiftsInputObjectSchema),
  role: z.lazy(() => StaffingRoleCreateNestedOneWithoutShiftsInputObjectSchema).optional(),
  assignedCandidate: z.lazy(() => StaffingCandidateCreateNestedOneWithoutShiftsAssignedInputObjectSchema).optional()
}).strict();
export const StaffingShiftCreateWithoutAssignedPersonaInputObjectSchema: z.ZodType<Prisma.StaffingShiftCreateWithoutAssignedPersonaInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingShiftCreateWithoutAssignedPersonaInput>;
export const StaffingShiftCreateWithoutAssignedPersonaInputObjectZodSchema = makeSchema();
