import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingCandidateWhereUniqueInputObjectSchema as StaffingCandidateWhereUniqueInputObjectSchema } from './StaffingCandidateWhereUniqueInput.schema';
import { StaffingCandidateUpdateWithoutPersonaInputObjectSchema as StaffingCandidateUpdateWithoutPersonaInputObjectSchema } from './StaffingCandidateUpdateWithoutPersonaInput.schema';
import { StaffingCandidateUncheckedUpdateWithoutPersonaInputObjectSchema as StaffingCandidateUncheckedUpdateWithoutPersonaInputObjectSchema } from './StaffingCandidateUncheckedUpdateWithoutPersonaInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingCandidateWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => StaffingCandidateUpdateWithoutPersonaInputObjectSchema), z.lazy(() => StaffingCandidateUncheckedUpdateWithoutPersonaInputObjectSchema)])
}).strict();
export const StaffingCandidateUpdateWithWhereUniqueWithoutPersonaInputObjectSchema: z.ZodType<Prisma.StaffingCandidateUpdateWithWhereUniqueWithoutPersonaInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingCandidateUpdateWithWhereUniqueWithoutPersonaInput>;
export const StaffingCandidateUpdateWithWhereUniqueWithoutPersonaInputObjectZodSchema = makeSchema();
