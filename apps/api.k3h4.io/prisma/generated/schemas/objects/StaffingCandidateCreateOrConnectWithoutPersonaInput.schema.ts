import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingCandidateWhereUniqueInputObjectSchema as StaffingCandidateWhereUniqueInputObjectSchema } from './StaffingCandidateWhereUniqueInput.schema';
import { StaffingCandidateCreateWithoutPersonaInputObjectSchema as StaffingCandidateCreateWithoutPersonaInputObjectSchema } from './StaffingCandidateCreateWithoutPersonaInput.schema';
import { StaffingCandidateUncheckedCreateWithoutPersonaInputObjectSchema as StaffingCandidateUncheckedCreateWithoutPersonaInputObjectSchema } from './StaffingCandidateUncheckedCreateWithoutPersonaInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingCandidateWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => StaffingCandidateCreateWithoutPersonaInputObjectSchema), z.lazy(() => StaffingCandidateUncheckedCreateWithoutPersonaInputObjectSchema)])
}).strict();
export const StaffingCandidateCreateOrConnectWithoutPersonaInputObjectSchema: z.ZodType<Prisma.StaffingCandidateCreateOrConnectWithoutPersonaInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingCandidateCreateOrConnectWithoutPersonaInput>;
export const StaffingCandidateCreateOrConnectWithoutPersonaInputObjectZodSchema = makeSchema();
