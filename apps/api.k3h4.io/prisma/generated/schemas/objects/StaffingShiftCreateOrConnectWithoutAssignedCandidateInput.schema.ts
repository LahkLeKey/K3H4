import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingShiftWhereUniqueInputObjectSchema as StaffingShiftWhereUniqueInputObjectSchema } from './StaffingShiftWhereUniqueInput.schema';
import { StaffingShiftCreateWithoutAssignedCandidateInputObjectSchema as StaffingShiftCreateWithoutAssignedCandidateInputObjectSchema } from './StaffingShiftCreateWithoutAssignedCandidateInput.schema';
import { StaffingShiftUncheckedCreateWithoutAssignedCandidateInputObjectSchema as StaffingShiftUncheckedCreateWithoutAssignedCandidateInputObjectSchema } from './StaffingShiftUncheckedCreateWithoutAssignedCandidateInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingShiftWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => StaffingShiftCreateWithoutAssignedCandidateInputObjectSchema), z.lazy(() => StaffingShiftUncheckedCreateWithoutAssignedCandidateInputObjectSchema)])
}).strict();
export const StaffingShiftCreateOrConnectWithoutAssignedCandidateInputObjectSchema: z.ZodType<Prisma.StaffingShiftCreateOrConnectWithoutAssignedCandidateInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingShiftCreateOrConnectWithoutAssignedCandidateInput>;
export const StaffingShiftCreateOrConnectWithoutAssignedCandidateInputObjectZodSchema = makeSchema();
