import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingCandidateCreateWithoutShiftsAssignedInputObjectSchema as StaffingCandidateCreateWithoutShiftsAssignedInputObjectSchema } from './StaffingCandidateCreateWithoutShiftsAssignedInput.schema';
import { StaffingCandidateUncheckedCreateWithoutShiftsAssignedInputObjectSchema as StaffingCandidateUncheckedCreateWithoutShiftsAssignedInputObjectSchema } from './StaffingCandidateUncheckedCreateWithoutShiftsAssignedInput.schema';
import { StaffingCandidateCreateOrConnectWithoutShiftsAssignedInputObjectSchema as StaffingCandidateCreateOrConnectWithoutShiftsAssignedInputObjectSchema } from './StaffingCandidateCreateOrConnectWithoutShiftsAssignedInput.schema';
import { StaffingCandidateWhereUniqueInputObjectSchema as StaffingCandidateWhereUniqueInputObjectSchema } from './StaffingCandidateWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => StaffingCandidateCreateWithoutShiftsAssignedInputObjectSchema), z.lazy(() => StaffingCandidateUncheckedCreateWithoutShiftsAssignedInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => StaffingCandidateCreateOrConnectWithoutShiftsAssignedInputObjectSchema).optional(),
  connect: z.lazy(() => StaffingCandidateWhereUniqueInputObjectSchema).optional()
}).strict();
export const StaffingCandidateCreateNestedOneWithoutShiftsAssignedInputObjectSchema: z.ZodType<Prisma.StaffingCandidateCreateNestedOneWithoutShiftsAssignedInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingCandidateCreateNestedOneWithoutShiftsAssignedInput>;
export const StaffingCandidateCreateNestedOneWithoutShiftsAssignedInputObjectZodSchema = makeSchema();
