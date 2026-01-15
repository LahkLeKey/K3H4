import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingCandidateCreateWithoutUserInputObjectSchema as StaffingCandidateCreateWithoutUserInputObjectSchema } from './StaffingCandidateCreateWithoutUserInput.schema';
import { StaffingCandidateUncheckedCreateWithoutUserInputObjectSchema as StaffingCandidateUncheckedCreateWithoutUserInputObjectSchema } from './StaffingCandidateUncheckedCreateWithoutUserInput.schema';
import { StaffingCandidateCreateOrConnectWithoutUserInputObjectSchema as StaffingCandidateCreateOrConnectWithoutUserInputObjectSchema } from './StaffingCandidateCreateOrConnectWithoutUserInput.schema';
import { StaffingCandidateUpsertWithWhereUniqueWithoutUserInputObjectSchema as StaffingCandidateUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './StaffingCandidateUpsertWithWhereUniqueWithoutUserInput.schema';
import { StaffingCandidateCreateManyUserInputEnvelopeObjectSchema as StaffingCandidateCreateManyUserInputEnvelopeObjectSchema } from './StaffingCandidateCreateManyUserInputEnvelope.schema';
import { StaffingCandidateWhereUniqueInputObjectSchema as StaffingCandidateWhereUniqueInputObjectSchema } from './StaffingCandidateWhereUniqueInput.schema';
import { StaffingCandidateUpdateWithWhereUniqueWithoutUserInputObjectSchema as StaffingCandidateUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './StaffingCandidateUpdateWithWhereUniqueWithoutUserInput.schema';
import { StaffingCandidateUpdateManyWithWhereWithoutUserInputObjectSchema as StaffingCandidateUpdateManyWithWhereWithoutUserInputObjectSchema } from './StaffingCandidateUpdateManyWithWhereWithoutUserInput.schema';
import { StaffingCandidateScalarWhereInputObjectSchema as StaffingCandidateScalarWhereInputObjectSchema } from './StaffingCandidateScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => StaffingCandidateCreateWithoutUserInputObjectSchema), z.lazy(() => StaffingCandidateCreateWithoutUserInputObjectSchema).array(), z.lazy(() => StaffingCandidateUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => StaffingCandidateUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => StaffingCandidateCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => StaffingCandidateCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => StaffingCandidateUpsertWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => StaffingCandidateUpsertWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => StaffingCandidateCreateManyUserInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => StaffingCandidateWhereUniqueInputObjectSchema), z.lazy(() => StaffingCandidateWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => StaffingCandidateWhereUniqueInputObjectSchema), z.lazy(() => StaffingCandidateWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => StaffingCandidateWhereUniqueInputObjectSchema), z.lazy(() => StaffingCandidateWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => StaffingCandidateWhereUniqueInputObjectSchema), z.lazy(() => StaffingCandidateWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => StaffingCandidateUpdateWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => StaffingCandidateUpdateWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => StaffingCandidateUpdateManyWithWhereWithoutUserInputObjectSchema), z.lazy(() => StaffingCandidateUpdateManyWithWhereWithoutUserInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => StaffingCandidateScalarWhereInputObjectSchema), z.lazy(() => StaffingCandidateScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const StaffingCandidateUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.StaffingCandidateUpdateManyWithoutUserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingCandidateUpdateManyWithoutUserNestedInput>;
export const StaffingCandidateUpdateManyWithoutUserNestedInputObjectZodSchema = makeSchema();
