import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { LifecycleStatusSchema } from '../enums/LifecycleStatus.schema';
import { CoverageStatusSchema } from '../enums/CoverageStatus.schema';
import { UserCreateNestedOneWithoutStaffingShiftsInputObjectSchema as UserCreateNestedOneWithoutStaffingShiftsInputObjectSchema } from './UserCreateNestedOneWithoutStaffingShiftsInput.schema';
import { PersonaCreateNestedOneWithoutStaffingShiftsAssignedInputObjectSchema as PersonaCreateNestedOneWithoutStaffingShiftsAssignedInputObjectSchema } from './PersonaCreateNestedOneWithoutStaffingShiftsAssignedInput.schema';
import { StaffingCandidateCreateNestedOneWithoutShiftsAssignedInputObjectSchema as StaffingCandidateCreateNestedOneWithoutShiftsAssignedInputObjectSchema } from './StaffingCandidateCreateNestedOneWithoutShiftsAssignedInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  title: z.string(),
  location: z.string().optional().nullable(),
  startsAt: z.coerce.date(),
  endsAt: z.coerce.date(),
  status: LifecycleStatusSchema.optional(),
  coverageStatus: CoverageStatusSchema.optional(),
  notes: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutStaffingShiftsInputObjectSchema),
  assignedPersona: z.lazy(() => PersonaCreateNestedOneWithoutStaffingShiftsAssignedInputObjectSchema).optional(),
  assignedCandidate: z.lazy(() => StaffingCandidateCreateNestedOneWithoutShiftsAssignedInputObjectSchema).optional()
}).strict();
export const StaffingShiftCreateWithoutRoleInputObjectSchema: z.ZodType<Prisma.StaffingShiftCreateWithoutRoleInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingShiftCreateWithoutRoleInput>;
export const StaffingShiftCreateWithoutRoleInputObjectZodSchema = makeSchema();
