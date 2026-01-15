import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingCandidateScalarWhereInputObjectSchema as StaffingCandidateScalarWhereInputObjectSchema } from './StaffingCandidateScalarWhereInput.schema';
import { StaffingCandidateUpdateManyMutationInputObjectSchema as StaffingCandidateUpdateManyMutationInputObjectSchema } from './StaffingCandidateUpdateManyMutationInput.schema';
import { StaffingCandidateUncheckedUpdateManyWithoutPersonaInputObjectSchema as StaffingCandidateUncheckedUpdateManyWithoutPersonaInputObjectSchema } from './StaffingCandidateUncheckedUpdateManyWithoutPersonaInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingCandidateScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => StaffingCandidateUpdateManyMutationInputObjectSchema), z.lazy(() => StaffingCandidateUncheckedUpdateManyWithoutPersonaInputObjectSchema)])
}).strict();
export const StaffingCandidateUpdateManyWithWhereWithoutPersonaInputObjectSchema: z.ZodType<Prisma.StaffingCandidateUpdateManyWithWhereWithoutPersonaInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingCandidateUpdateManyWithWhereWithoutPersonaInput>;
export const StaffingCandidateUpdateManyWithWhereWithoutPersonaInputObjectZodSchema = makeSchema();
