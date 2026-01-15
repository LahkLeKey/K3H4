import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingCandidateWhereInputObjectSchema as StaffingCandidateWhereInputObjectSchema } from './StaffingCandidateWhereInput.schema';
import { StaffingCandidateUpdateWithoutShiftsAssignedInputObjectSchema as StaffingCandidateUpdateWithoutShiftsAssignedInputObjectSchema } from './StaffingCandidateUpdateWithoutShiftsAssignedInput.schema';
import { StaffingCandidateUncheckedUpdateWithoutShiftsAssignedInputObjectSchema as StaffingCandidateUncheckedUpdateWithoutShiftsAssignedInputObjectSchema } from './StaffingCandidateUncheckedUpdateWithoutShiftsAssignedInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingCandidateWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => StaffingCandidateUpdateWithoutShiftsAssignedInputObjectSchema), z.lazy(() => StaffingCandidateUncheckedUpdateWithoutShiftsAssignedInputObjectSchema)])
}).strict();
export const StaffingCandidateUpdateToOneWithWhereWithoutShiftsAssignedInputObjectSchema: z.ZodType<Prisma.StaffingCandidateUpdateToOneWithWhereWithoutShiftsAssignedInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingCandidateUpdateToOneWithWhereWithoutShiftsAssignedInput>;
export const StaffingCandidateUpdateToOneWithWhereWithoutShiftsAssignedInputObjectZodSchema = makeSchema();
