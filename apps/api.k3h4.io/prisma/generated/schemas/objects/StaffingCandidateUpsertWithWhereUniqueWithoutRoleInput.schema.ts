import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingCandidateWhereUniqueInputObjectSchema as StaffingCandidateWhereUniqueInputObjectSchema } from './StaffingCandidateWhereUniqueInput.schema';
import { StaffingCandidateUpdateWithoutRoleInputObjectSchema as StaffingCandidateUpdateWithoutRoleInputObjectSchema } from './StaffingCandidateUpdateWithoutRoleInput.schema';
import { StaffingCandidateUncheckedUpdateWithoutRoleInputObjectSchema as StaffingCandidateUncheckedUpdateWithoutRoleInputObjectSchema } from './StaffingCandidateUncheckedUpdateWithoutRoleInput.schema';
import { StaffingCandidateCreateWithoutRoleInputObjectSchema as StaffingCandidateCreateWithoutRoleInputObjectSchema } from './StaffingCandidateCreateWithoutRoleInput.schema';
import { StaffingCandidateUncheckedCreateWithoutRoleInputObjectSchema as StaffingCandidateUncheckedCreateWithoutRoleInputObjectSchema } from './StaffingCandidateUncheckedCreateWithoutRoleInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingCandidateWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => StaffingCandidateUpdateWithoutRoleInputObjectSchema), z.lazy(() => StaffingCandidateUncheckedUpdateWithoutRoleInputObjectSchema)]),
  create: z.union([z.lazy(() => StaffingCandidateCreateWithoutRoleInputObjectSchema), z.lazy(() => StaffingCandidateUncheckedCreateWithoutRoleInputObjectSchema)])
}).strict();
export const StaffingCandidateUpsertWithWhereUniqueWithoutRoleInputObjectSchema: z.ZodType<Prisma.StaffingCandidateUpsertWithWhereUniqueWithoutRoleInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingCandidateUpsertWithWhereUniqueWithoutRoleInput>;
export const StaffingCandidateUpsertWithWhereUniqueWithoutRoleInputObjectZodSchema = makeSchema();
