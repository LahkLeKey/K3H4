import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingShiftWhereUniqueInputObjectSchema as StaffingShiftWhereUniqueInputObjectSchema } from './StaffingShiftWhereUniqueInput.schema';
import { StaffingShiftUpdateWithoutAssignedCandidateInputObjectSchema as StaffingShiftUpdateWithoutAssignedCandidateInputObjectSchema } from './StaffingShiftUpdateWithoutAssignedCandidateInput.schema';
import { StaffingShiftUncheckedUpdateWithoutAssignedCandidateInputObjectSchema as StaffingShiftUncheckedUpdateWithoutAssignedCandidateInputObjectSchema } from './StaffingShiftUncheckedUpdateWithoutAssignedCandidateInput.schema';
import { StaffingShiftCreateWithoutAssignedCandidateInputObjectSchema as StaffingShiftCreateWithoutAssignedCandidateInputObjectSchema } from './StaffingShiftCreateWithoutAssignedCandidateInput.schema';
import { StaffingShiftUncheckedCreateWithoutAssignedCandidateInputObjectSchema as StaffingShiftUncheckedCreateWithoutAssignedCandidateInputObjectSchema } from './StaffingShiftUncheckedCreateWithoutAssignedCandidateInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingShiftWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => StaffingShiftUpdateWithoutAssignedCandidateInputObjectSchema), z.lazy(() => StaffingShiftUncheckedUpdateWithoutAssignedCandidateInputObjectSchema)]),
  create: z.union([z.lazy(() => StaffingShiftCreateWithoutAssignedCandidateInputObjectSchema), z.lazy(() => StaffingShiftUncheckedCreateWithoutAssignedCandidateInputObjectSchema)])
}).strict();
export const StaffingShiftUpsertWithWhereUniqueWithoutAssignedCandidateInputObjectSchema: z.ZodType<Prisma.StaffingShiftUpsertWithWhereUniqueWithoutAssignedCandidateInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingShiftUpsertWithWhereUniqueWithoutAssignedCandidateInput>;
export const StaffingShiftUpsertWithWhereUniqueWithoutAssignedCandidateInputObjectZodSchema = makeSchema();
