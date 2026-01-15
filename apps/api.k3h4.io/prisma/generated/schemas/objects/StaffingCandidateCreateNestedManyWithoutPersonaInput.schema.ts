import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingCandidateCreateWithoutPersonaInputObjectSchema as StaffingCandidateCreateWithoutPersonaInputObjectSchema } from './StaffingCandidateCreateWithoutPersonaInput.schema';
import { StaffingCandidateUncheckedCreateWithoutPersonaInputObjectSchema as StaffingCandidateUncheckedCreateWithoutPersonaInputObjectSchema } from './StaffingCandidateUncheckedCreateWithoutPersonaInput.schema';
import { StaffingCandidateCreateOrConnectWithoutPersonaInputObjectSchema as StaffingCandidateCreateOrConnectWithoutPersonaInputObjectSchema } from './StaffingCandidateCreateOrConnectWithoutPersonaInput.schema';
import { StaffingCandidateCreateManyPersonaInputEnvelopeObjectSchema as StaffingCandidateCreateManyPersonaInputEnvelopeObjectSchema } from './StaffingCandidateCreateManyPersonaInputEnvelope.schema';
import { StaffingCandidateWhereUniqueInputObjectSchema as StaffingCandidateWhereUniqueInputObjectSchema } from './StaffingCandidateWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => StaffingCandidateCreateWithoutPersonaInputObjectSchema), z.lazy(() => StaffingCandidateCreateWithoutPersonaInputObjectSchema).array(), z.lazy(() => StaffingCandidateUncheckedCreateWithoutPersonaInputObjectSchema), z.lazy(() => StaffingCandidateUncheckedCreateWithoutPersonaInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => StaffingCandidateCreateOrConnectWithoutPersonaInputObjectSchema), z.lazy(() => StaffingCandidateCreateOrConnectWithoutPersonaInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => StaffingCandidateCreateManyPersonaInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => StaffingCandidateWhereUniqueInputObjectSchema), z.lazy(() => StaffingCandidateWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const StaffingCandidateCreateNestedManyWithoutPersonaInputObjectSchema: z.ZodType<Prisma.StaffingCandidateCreateNestedManyWithoutPersonaInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingCandidateCreateNestedManyWithoutPersonaInput>;
export const StaffingCandidateCreateNestedManyWithoutPersonaInputObjectZodSchema = makeSchema();
