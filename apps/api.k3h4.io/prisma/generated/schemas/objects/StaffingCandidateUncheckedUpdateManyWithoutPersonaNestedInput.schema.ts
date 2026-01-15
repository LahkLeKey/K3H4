import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingCandidateCreateWithoutPersonaInputObjectSchema as StaffingCandidateCreateWithoutPersonaInputObjectSchema } from './StaffingCandidateCreateWithoutPersonaInput.schema';
import { StaffingCandidateUncheckedCreateWithoutPersonaInputObjectSchema as StaffingCandidateUncheckedCreateWithoutPersonaInputObjectSchema } from './StaffingCandidateUncheckedCreateWithoutPersonaInput.schema';
import { StaffingCandidateCreateOrConnectWithoutPersonaInputObjectSchema as StaffingCandidateCreateOrConnectWithoutPersonaInputObjectSchema } from './StaffingCandidateCreateOrConnectWithoutPersonaInput.schema';
import { StaffingCandidateUpsertWithWhereUniqueWithoutPersonaInputObjectSchema as StaffingCandidateUpsertWithWhereUniqueWithoutPersonaInputObjectSchema } from './StaffingCandidateUpsertWithWhereUniqueWithoutPersonaInput.schema';
import { StaffingCandidateCreateManyPersonaInputEnvelopeObjectSchema as StaffingCandidateCreateManyPersonaInputEnvelopeObjectSchema } from './StaffingCandidateCreateManyPersonaInputEnvelope.schema';
import { StaffingCandidateWhereUniqueInputObjectSchema as StaffingCandidateWhereUniqueInputObjectSchema } from './StaffingCandidateWhereUniqueInput.schema';
import { StaffingCandidateUpdateWithWhereUniqueWithoutPersonaInputObjectSchema as StaffingCandidateUpdateWithWhereUniqueWithoutPersonaInputObjectSchema } from './StaffingCandidateUpdateWithWhereUniqueWithoutPersonaInput.schema';
import { StaffingCandidateUpdateManyWithWhereWithoutPersonaInputObjectSchema as StaffingCandidateUpdateManyWithWhereWithoutPersonaInputObjectSchema } from './StaffingCandidateUpdateManyWithWhereWithoutPersonaInput.schema';
import { StaffingCandidateScalarWhereInputObjectSchema as StaffingCandidateScalarWhereInputObjectSchema } from './StaffingCandidateScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => StaffingCandidateCreateWithoutPersonaInputObjectSchema), z.lazy(() => StaffingCandidateCreateWithoutPersonaInputObjectSchema).array(), z.lazy(() => StaffingCandidateUncheckedCreateWithoutPersonaInputObjectSchema), z.lazy(() => StaffingCandidateUncheckedCreateWithoutPersonaInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => StaffingCandidateCreateOrConnectWithoutPersonaInputObjectSchema), z.lazy(() => StaffingCandidateCreateOrConnectWithoutPersonaInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => StaffingCandidateUpsertWithWhereUniqueWithoutPersonaInputObjectSchema), z.lazy(() => StaffingCandidateUpsertWithWhereUniqueWithoutPersonaInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => StaffingCandidateCreateManyPersonaInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => StaffingCandidateWhereUniqueInputObjectSchema), z.lazy(() => StaffingCandidateWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => StaffingCandidateWhereUniqueInputObjectSchema), z.lazy(() => StaffingCandidateWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => StaffingCandidateWhereUniqueInputObjectSchema), z.lazy(() => StaffingCandidateWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => StaffingCandidateWhereUniqueInputObjectSchema), z.lazy(() => StaffingCandidateWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => StaffingCandidateUpdateWithWhereUniqueWithoutPersonaInputObjectSchema), z.lazy(() => StaffingCandidateUpdateWithWhereUniqueWithoutPersonaInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => StaffingCandidateUpdateManyWithWhereWithoutPersonaInputObjectSchema), z.lazy(() => StaffingCandidateUpdateManyWithWhereWithoutPersonaInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => StaffingCandidateScalarWhereInputObjectSchema), z.lazy(() => StaffingCandidateScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const StaffingCandidateUncheckedUpdateManyWithoutPersonaNestedInputObjectSchema: z.ZodType<Prisma.StaffingCandidateUncheckedUpdateManyWithoutPersonaNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingCandidateUncheckedUpdateManyWithoutPersonaNestedInput>;
export const StaffingCandidateUncheckedUpdateManyWithoutPersonaNestedInputObjectZodSchema = makeSchema();
