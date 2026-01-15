import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingCandidateCreateWithoutShiftsAssignedInputObjectSchema as StaffingCandidateCreateWithoutShiftsAssignedInputObjectSchema } from './StaffingCandidateCreateWithoutShiftsAssignedInput.schema';
import { StaffingCandidateUncheckedCreateWithoutShiftsAssignedInputObjectSchema as StaffingCandidateUncheckedCreateWithoutShiftsAssignedInputObjectSchema } from './StaffingCandidateUncheckedCreateWithoutShiftsAssignedInput.schema';
import { StaffingCandidateCreateOrConnectWithoutShiftsAssignedInputObjectSchema as StaffingCandidateCreateOrConnectWithoutShiftsAssignedInputObjectSchema } from './StaffingCandidateCreateOrConnectWithoutShiftsAssignedInput.schema';
import { StaffingCandidateUpsertWithoutShiftsAssignedInputObjectSchema as StaffingCandidateUpsertWithoutShiftsAssignedInputObjectSchema } from './StaffingCandidateUpsertWithoutShiftsAssignedInput.schema';
import { StaffingCandidateWhereInputObjectSchema as StaffingCandidateWhereInputObjectSchema } from './StaffingCandidateWhereInput.schema';
import { StaffingCandidateWhereUniqueInputObjectSchema as StaffingCandidateWhereUniqueInputObjectSchema } from './StaffingCandidateWhereUniqueInput.schema';
import { StaffingCandidateUpdateToOneWithWhereWithoutShiftsAssignedInputObjectSchema as StaffingCandidateUpdateToOneWithWhereWithoutShiftsAssignedInputObjectSchema } from './StaffingCandidateUpdateToOneWithWhereWithoutShiftsAssignedInput.schema';
import { StaffingCandidateUpdateWithoutShiftsAssignedInputObjectSchema as StaffingCandidateUpdateWithoutShiftsAssignedInputObjectSchema } from './StaffingCandidateUpdateWithoutShiftsAssignedInput.schema';
import { StaffingCandidateUncheckedUpdateWithoutShiftsAssignedInputObjectSchema as StaffingCandidateUncheckedUpdateWithoutShiftsAssignedInputObjectSchema } from './StaffingCandidateUncheckedUpdateWithoutShiftsAssignedInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => StaffingCandidateCreateWithoutShiftsAssignedInputObjectSchema), z.lazy(() => StaffingCandidateUncheckedCreateWithoutShiftsAssignedInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => StaffingCandidateCreateOrConnectWithoutShiftsAssignedInputObjectSchema).optional(),
  upsert: z.lazy(() => StaffingCandidateUpsertWithoutShiftsAssignedInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => StaffingCandidateWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => StaffingCandidateWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => StaffingCandidateWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => StaffingCandidateUpdateToOneWithWhereWithoutShiftsAssignedInputObjectSchema), z.lazy(() => StaffingCandidateUpdateWithoutShiftsAssignedInputObjectSchema), z.lazy(() => StaffingCandidateUncheckedUpdateWithoutShiftsAssignedInputObjectSchema)]).optional()
}).strict();
export const StaffingCandidateUpdateOneWithoutShiftsAssignedNestedInputObjectSchema: z.ZodType<Prisma.StaffingCandidateUpdateOneWithoutShiftsAssignedNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingCandidateUpdateOneWithoutShiftsAssignedNestedInput>;
export const StaffingCandidateUpdateOneWithoutShiftsAssignedNestedInputObjectZodSchema = makeSchema();
