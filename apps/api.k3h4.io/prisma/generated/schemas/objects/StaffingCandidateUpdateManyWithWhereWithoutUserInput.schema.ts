import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingCandidateScalarWhereInputObjectSchema as StaffingCandidateScalarWhereInputObjectSchema } from './StaffingCandidateScalarWhereInput.schema';
import { StaffingCandidateUpdateManyMutationInputObjectSchema as StaffingCandidateUpdateManyMutationInputObjectSchema } from './StaffingCandidateUpdateManyMutationInput.schema';
import { StaffingCandidateUncheckedUpdateManyWithoutUserInputObjectSchema as StaffingCandidateUncheckedUpdateManyWithoutUserInputObjectSchema } from './StaffingCandidateUncheckedUpdateManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingCandidateScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => StaffingCandidateUpdateManyMutationInputObjectSchema), z.lazy(() => StaffingCandidateUncheckedUpdateManyWithoutUserInputObjectSchema)])
}).strict();
export const StaffingCandidateUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.StaffingCandidateUpdateManyWithWhereWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingCandidateUpdateManyWithWhereWithoutUserInput>;
export const StaffingCandidateUpdateManyWithWhereWithoutUserInputObjectZodSchema = makeSchema();
