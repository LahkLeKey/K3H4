import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingShiftScalarWhereInputObjectSchema as StaffingShiftScalarWhereInputObjectSchema } from './StaffingShiftScalarWhereInput.schema';
import { StaffingShiftUpdateManyMutationInputObjectSchema as StaffingShiftUpdateManyMutationInputObjectSchema } from './StaffingShiftUpdateManyMutationInput.schema';
import { StaffingShiftUncheckedUpdateManyWithoutAssignedCandidateInputObjectSchema as StaffingShiftUncheckedUpdateManyWithoutAssignedCandidateInputObjectSchema } from './StaffingShiftUncheckedUpdateManyWithoutAssignedCandidateInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingShiftScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => StaffingShiftUpdateManyMutationInputObjectSchema), z.lazy(() => StaffingShiftUncheckedUpdateManyWithoutAssignedCandidateInputObjectSchema)])
}).strict();
export const StaffingShiftUpdateManyWithWhereWithoutAssignedCandidateInputObjectSchema: z.ZodType<Prisma.StaffingShiftUpdateManyWithWhereWithoutAssignedCandidateInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingShiftUpdateManyWithWhereWithoutAssignedCandidateInput>;
export const StaffingShiftUpdateManyWithWhereWithoutAssignedCandidateInputObjectZodSchema = makeSchema();
