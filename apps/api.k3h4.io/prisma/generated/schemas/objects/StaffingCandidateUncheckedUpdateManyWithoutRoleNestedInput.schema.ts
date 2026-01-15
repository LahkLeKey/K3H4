import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingCandidateCreateWithoutRoleInputObjectSchema as StaffingCandidateCreateWithoutRoleInputObjectSchema } from './StaffingCandidateCreateWithoutRoleInput.schema';
import { StaffingCandidateUncheckedCreateWithoutRoleInputObjectSchema as StaffingCandidateUncheckedCreateWithoutRoleInputObjectSchema } from './StaffingCandidateUncheckedCreateWithoutRoleInput.schema';
import { StaffingCandidateCreateOrConnectWithoutRoleInputObjectSchema as StaffingCandidateCreateOrConnectWithoutRoleInputObjectSchema } from './StaffingCandidateCreateOrConnectWithoutRoleInput.schema';
import { StaffingCandidateUpsertWithWhereUniqueWithoutRoleInputObjectSchema as StaffingCandidateUpsertWithWhereUniqueWithoutRoleInputObjectSchema } from './StaffingCandidateUpsertWithWhereUniqueWithoutRoleInput.schema';
import { StaffingCandidateCreateManyRoleInputEnvelopeObjectSchema as StaffingCandidateCreateManyRoleInputEnvelopeObjectSchema } from './StaffingCandidateCreateManyRoleInputEnvelope.schema';
import { StaffingCandidateWhereUniqueInputObjectSchema as StaffingCandidateWhereUniqueInputObjectSchema } from './StaffingCandidateWhereUniqueInput.schema';
import { StaffingCandidateUpdateWithWhereUniqueWithoutRoleInputObjectSchema as StaffingCandidateUpdateWithWhereUniqueWithoutRoleInputObjectSchema } from './StaffingCandidateUpdateWithWhereUniqueWithoutRoleInput.schema';
import { StaffingCandidateUpdateManyWithWhereWithoutRoleInputObjectSchema as StaffingCandidateUpdateManyWithWhereWithoutRoleInputObjectSchema } from './StaffingCandidateUpdateManyWithWhereWithoutRoleInput.schema';
import { StaffingCandidateScalarWhereInputObjectSchema as StaffingCandidateScalarWhereInputObjectSchema } from './StaffingCandidateScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => StaffingCandidateCreateWithoutRoleInputObjectSchema), z.lazy(() => StaffingCandidateCreateWithoutRoleInputObjectSchema).array(), z.lazy(() => StaffingCandidateUncheckedCreateWithoutRoleInputObjectSchema), z.lazy(() => StaffingCandidateUncheckedCreateWithoutRoleInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => StaffingCandidateCreateOrConnectWithoutRoleInputObjectSchema), z.lazy(() => StaffingCandidateCreateOrConnectWithoutRoleInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => StaffingCandidateUpsertWithWhereUniqueWithoutRoleInputObjectSchema), z.lazy(() => StaffingCandidateUpsertWithWhereUniqueWithoutRoleInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => StaffingCandidateCreateManyRoleInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => StaffingCandidateWhereUniqueInputObjectSchema), z.lazy(() => StaffingCandidateWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => StaffingCandidateWhereUniqueInputObjectSchema), z.lazy(() => StaffingCandidateWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => StaffingCandidateWhereUniqueInputObjectSchema), z.lazy(() => StaffingCandidateWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => StaffingCandidateWhereUniqueInputObjectSchema), z.lazy(() => StaffingCandidateWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => StaffingCandidateUpdateWithWhereUniqueWithoutRoleInputObjectSchema), z.lazy(() => StaffingCandidateUpdateWithWhereUniqueWithoutRoleInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => StaffingCandidateUpdateManyWithWhereWithoutRoleInputObjectSchema), z.lazy(() => StaffingCandidateUpdateManyWithWhereWithoutRoleInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => StaffingCandidateScalarWhereInputObjectSchema), z.lazy(() => StaffingCandidateScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const StaffingCandidateUncheckedUpdateManyWithoutRoleNestedInputObjectSchema: z.ZodType<Prisma.StaffingCandidateUncheckedUpdateManyWithoutRoleNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingCandidateUncheckedUpdateManyWithoutRoleNestedInput>;
export const StaffingCandidateUncheckedUpdateManyWithoutRoleNestedInputObjectZodSchema = makeSchema();
