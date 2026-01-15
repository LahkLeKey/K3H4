import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingCandidateUpdateWithoutShiftsAssignedInputObjectSchema as StaffingCandidateUpdateWithoutShiftsAssignedInputObjectSchema } from './StaffingCandidateUpdateWithoutShiftsAssignedInput.schema';
import { StaffingCandidateUncheckedUpdateWithoutShiftsAssignedInputObjectSchema as StaffingCandidateUncheckedUpdateWithoutShiftsAssignedInputObjectSchema } from './StaffingCandidateUncheckedUpdateWithoutShiftsAssignedInput.schema';
import { StaffingCandidateCreateWithoutShiftsAssignedInputObjectSchema as StaffingCandidateCreateWithoutShiftsAssignedInputObjectSchema } from './StaffingCandidateCreateWithoutShiftsAssignedInput.schema';
import { StaffingCandidateUncheckedCreateWithoutShiftsAssignedInputObjectSchema as StaffingCandidateUncheckedCreateWithoutShiftsAssignedInputObjectSchema } from './StaffingCandidateUncheckedCreateWithoutShiftsAssignedInput.schema';
import { StaffingCandidateWhereInputObjectSchema as StaffingCandidateWhereInputObjectSchema } from './StaffingCandidateWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => StaffingCandidateUpdateWithoutShiftsAssignedInputObjectSchema), z.lazy(() => StaffingCandidateUncheckedUpdateWithoutShiftsAssignedInputObjectSchema)]),
  create: z.union([z.lazy(() => StaffingCandidateCreateWithoutShiftsAssignedInputObjectSchema), z.lazy(() => StaffingCandidateUncheckedCreateWithoutShiftsAssignedInputObjectSchema)]),
  where: z.lazy(() => StaffingCandidateWhereInputObjectSchema).optional()
}).strict();
export const StaffingCandidateUpsertWithoutShiftsAssignedInputObjectSchema: z.ZodType<Prisma.StaffingCandidateUpsertWithoutShiftsAssignedInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingCandidateUpsertWithoutShiftsAssignedInput>;
export const StaffingCandidateUpsertWithoutShiftsAssignedInputObjectZodSchema = makeSchema();
