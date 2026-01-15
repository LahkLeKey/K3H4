import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingCandidateWhereUniqueInputObjectSchema as StaffingCandidateWhereUniqueInputObjectSchema } from './StaffingCandidateWhereUniqueInput.schema';
import { StaffingCandidateUpdateWithoutPersonaInputObjectSchema as StaffingCandidateUpdateWithoutPersonaInputObjectSchema } from './StaffingCandidateUpdateWithoutPersonaInput.schema';
import { StaffingCandidateUncheckedUpdateWithoutPersonaInputObjectSchema as StaffingCandidateUncheckedUpdateWithoutPersonaInputObjectSchema } from './StaffingCandidateUncheckedUpdateWithoutPersonaInput.schema';
import { StaffingCandidateCreateWithoutPersonaInputObjectSchema as StaffingCandidateCreateWithoutPersonaInputObjectSchema } from './StaffingCandidateCreateWithoutPersonaInput.schema';
import { StaffingCandidateUncheckedCreateWithoutPersonaInputObjectSchema as StaffingCandidateUncheckedCreateWithoutPersonaInputObjectSchema } from './StaffingCandidateUncheckedCreateWithoutPersonaInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingCandidateWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => StaffingCandidateUpdateWithoutPersonaInputObjectSchema), z.lazy(() => StaffingCandidateUncheckedUpdateWithoutPersonaInputObjectSchema)]),
  create: z.union([z.lazy(() => StaffingCandidateCreateWithoutPersonaInputObjectSchema), z.lazy(() => StaffingCandidateUncheckedCreateWithoutPersonaInputObjectSchema)])
}).strict();
export const StaffingCandidateUpsertWithWhereUniqueWithoutPersonaInputObjectSchema: z.ZodType<Prisma.StaffingCandidateUpsertWithWhereUniqueWithoutPersonaInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingCandidateUpsertWithWhereUniqueWithoutPersonaInput>;
export const StaffingCandidateUpsertWithWhereUniqueWithoutPersonaInputObjectZodSchema = makeSchema();
