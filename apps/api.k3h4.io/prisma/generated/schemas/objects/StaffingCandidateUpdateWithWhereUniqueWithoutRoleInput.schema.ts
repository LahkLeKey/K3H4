import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingCandidateWhereUniqueInputObjectSchema as StaffingCandidateWhereUniqueInputObjectSchema } from './StaffingCandidateWhereUniqueInput.schema';
import { StaffingCandidateUpdateWithoutRoleInputObjectSchema as StaffingCandidateUpdateWithoutRoleInputObjectSchema } from './StaffingCandidateUpdateWithoutRoleInput.schema';
import { StaffingCandidateUncheckedUpdateWithoutRoleInputObjectSchema as StaffingCandidateUncheckedUpdateWithoutRoleInputObjectSchema } from './StaffingCandidateUncheckedUpdateWithoutRoleInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingCandidateWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => StaffingCandidateUpdateWithoutRoleInputObjectSchema), z.lazy(() => StaffingCandidateUncheckedUpdateWithoutRoleInputObjectSchema)])
}).strict();
export const StaffingCandidateUpdateWithWhereUniqueWithoutRoleInputObjectSchema: z.ZodType<Prisma.StaffingCandidateUpdateWithWhereUniqueWithoutRoleInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingCandidateUpdateWithWhereUniqueWithoutRoleInput>;
export const StaffingCandidateUpdateWithWhereUniqueWithoutRoleInputObjectZodSchema = makeSchema();
