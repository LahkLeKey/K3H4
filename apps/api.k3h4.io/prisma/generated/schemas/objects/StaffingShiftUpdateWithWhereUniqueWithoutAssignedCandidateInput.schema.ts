import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingShiftWhereUniqueInputObjectSchema as StaffingShiftWhereUniqueInputObjectSchema } from './StaffingShiftWhereUniqueInput.schema';
import { StaffingShiftUpdateWithoutAssignedCandidateInputObjectSchema as StaffingShiftUpdateWithoutAssignedCandidateInputObjectSchema } from './StaffingShiftUpdateWithoutAssignedCandidateInput.schema';
import { StaffingShiftUncheckedUpdateWithoutAssignedCandidateInputObjectSchema as StaffingShiftUncheckedUpdateWithoutAssignedCandidateInputObjectSchema } from './StaffingShiftUncheckedUpdateWithoutAssignedCandidateInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingShiftWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => StaffingShiftUpdateWithoutAssignedCandidateInputObjectSchema), z.lazy(() => StaffingShiftUncheckedUpdateWithoutAssignedCandidateInputObjectSchema)])
}).strict();
export const StaffingShiftUpdateWithWhereUniqueWithoutAssignedCandidateInputObjectSchema: z.ZodType<Prisma.StaffingShiftUpdateWithWhereUniqueWithoutAssignedCandidateInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingShiftUpdateWithWhereUniqueWithoutAssignedCandidateInput>;
export const StaffingShiftUpdateWithWhereUniqueWithoutAssignedCandidateInputObjectZodSchema = makeSchema();
