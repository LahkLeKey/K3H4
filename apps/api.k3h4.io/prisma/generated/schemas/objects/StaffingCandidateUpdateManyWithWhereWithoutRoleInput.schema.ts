import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingCandidateScalarWhereInputObjectSchema as StaffingCandidateScalarWhereInputObjectSchema } from './StaffingCandidateScalarWhereInput.schema';
import { StaffingCandidateUpdateManyMutationInputObjectSchema as StaffingCandidateUpdateManyMutationInputObjectSchema } from './StaffingCandidateUpdateManyMutationInput.schema';
import { StaffingCandidateUncheckedUpdateManyWithoutRoleInputObjectSchema as StaffingCandidateUncheckedUpdateManyWithoutRoleInputObjectSchema } from './StaffingCandidateUncheckedUpdateManyWithoutRoleInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingCandidateScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => StaffingCandidateUpdateManyMutationInputObjectSchema), z.lazy(() => StaffingCandidateUncheckedUpdateManyWithoutRoleInputObjectSchema)])
}).strict();
export const StaffingCandidateUpdateManyWithWhereWithoutRoleInputObjectSchema: z.ZodType<Prisma.StaffingCandidateUpdateManyWithWhereWithoutRoleInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingCandidateUpdateManyWithWhereWithoutRoleInput>;
export const StaffingCandidateUpdateManyWithWhereWithoutRoleInputObjectZodSchema = makeSchema();
