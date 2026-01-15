import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingCandidateWhereUniqueInputObjectSchema as StaffingCandidateWhereUniqueInputObjectSchema } from './StaffingCandidateWhereUniqueInput.schema';
import { StaffingCandidateCreateWithoutShiftsAssignedInputObjectSchema as StaffingCandidateCreateWithoutShiftsAssignedInputObjectSchema } from './StaffingCandidateCreateWithoutShiftsAssignedInput.schema';
import { StaffingCandidateUncheckedCreateWithoutShiftsAssignedInputObjectSchema as StaffingCandidateUncheckedCreateWithoutShiftsAssignedInputObjectSchema } from './StaffingCandidateUncheckedCreateWithoutShiftsAssignedInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingCandidateWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => StaffingCandidateCreateWithoutShiftsAssignedInputObjectSchema), z.lazy(() => StaffingCandidateUncheckedCreateWithoutShiftsAssignedInputObjectSchema)])
}).strict();
export const StaffingCandidateCreateOrConnectWithoutShiftsAssignedInputObjectSchema: z.ZodType<Prisma.StaffingCandidateCreateOrConnectWithoutShiftsAssignedInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingCandidateCreateOrConnectWithoutShiftsAssignedInput>;
export const StaffingCandidateCreateOrConnectWithoutShiftsAssignedInputObjectZodSchema = makeSchema();
