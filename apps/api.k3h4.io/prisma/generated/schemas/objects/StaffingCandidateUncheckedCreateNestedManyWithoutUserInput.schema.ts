import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingCandidateCreateWithoutUserInputObjectSchema as StaffingCandidateCreateWithoutUserInputObjectSchema } from './StaffingCandidateCreateWithoutUserInput.schema';
import { StaffingCandidateUncheckedCreateWithoutUserInputObjectSchema as StaffingCandidateUncheckedCreateWithoutUserInputObjectSchema } from './StaffingCandidateUncheckedCreateWithoutUserInput.schema';
import { StaffingCandidateCreateOrConnectWithoutUserInputObjectSchema as StaffingCandidateCreateOrConnectWithoutUserInputObjectSchema } from './StaffingCandidateCreateOrConnectWithoutUserInput.schema';
import { StaffingCandidateCreateManyUserInputEnvelopeObjectSchema as StaffingCandidateCreateManyUserInputEnvelopeObjectSchema } from './StaffingCandidateCreateManyUserInputEnvelope.schema';
import { StaffingCandidateWhereUniqueInputObjectSchema as StaffingCandidateWhereUniqueInputObjectSchema } from './StaffingCandidateWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => StaffingCandidateCreateWithoutUserInputObjectSchema), z.lazy(() => StaffingCandidateCreateWithoutUserInputObjectSchema).array(), z.lazy(() => StaffingCandidateUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => StaffingCandidateUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => StaffingCandidateCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => StaffingCandidateCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => StaffingCandidateCreateManyUserInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => StaffingCandidateWhereUniqueInputObjectSchema), z.lazy(() => StaffingCandidateWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const StaffingCandidateUncheckedCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.StaffingCandidateUncheckedCreateNestedManyWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingCandidateUncheckedCreateNestedManyWithoutUserInput>;
export const StaffingCandidateUncheckedCreateNestedManyWithoutUserInputObjectZodSchema = makeSchema();
