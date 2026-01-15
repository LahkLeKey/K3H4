import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingCandidateCreateWithoutEngagementInputObjectSchema as StaffingCandidateCreateWithoutEngagementInputObjectSchema } from './StaffingCandidateCreateWithoutEngagementInput.schema';
import { StaffingCandidateUncheckedCreateWithoutEngagementInputObjectSchema as StaffingCandidateUncheckedCreateWithoutEngagementInputObjectSchema } from './StaffingCandidateUncheckedCreateWithoutEngagementInput.schema';
import { StaffingCandidateCreateOrConnectWithoutEngagementInputObjectSchema as StaffingCandidateCreateOrConnectWithoutEngagementInputObjectSchema } from './StaffingCandidateCreateOrConnectWithoutEngagementInput.schema';
import { StaffingCandidateUpsertWithWhereUniqueWithoutEngagementInputObjectSchema as StaffingCandidateUpsertWithWhereUniqueWithoutEngagementInputObjectSchema } from './StaffingCandidateUpsertWithWhereUniqueWithoutEngagementInput.schema';
import { StaffingCandidateCreateManyEngagementInputEnvelopeObjectSchema as StaffingCandidateCreateManyEngagementInputEnvelopeObjectSchema } from './StaffingCandidateCreateManyEngagementInputEnvelope.schema';
import { StaffingCandidateWhereUniqueInputObjectSchema as StaffingCandidateWhereUniqueInputObjectSchema } from './StaffingCandidateWhereUniqueInput.schema';
import { StaffingCandidateUpdateWithWhereUniqueWithoutEngagementInputObjectSchema as StaffingCandidateUpdateWithWhereUniqueWithoutEngagementInputObjectSchema } from './StaffingCandidateUpdateWithWhereUniqueWithoutEngagementInput.schema';
import { StaffingCandidateUpdateManyWithWhereWithoutEngagementInputObjectSchema as StaffingCandidateUpdateManyWithWhereWithoutEngagementInputObjectSchema } from './StaffingCandidateUpdateManyWithWhereWithoutEngagementInput.schema';
import { StaffingCandidateScalarWhereInputObjectSchema as StaffingCandidateScalarWhereInputObjectSchema } from './StaffingCandidateScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => StaffingCandidateCreateWithoutEngagementInputObjectSchema), z.lazy(() => StaffingCandidateCreateWithoutEngagementInputObjectSchema).array(), z.lazy(() => StaffingCandidateUncheckedCreateWithoutEngagementInputObjectSchema), z.lazy(() => StaffingCandidateUncheckedCreateWithoutEngagementInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => StaffingCandidateCreateOrConnectWithoutEngagementInputObjectSchema), z.lazy(() => StaffingCandidateCreateOrConnectWithoutEngagementInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => StaffingCandidateUpsertWithWhereUniqueWithoutEngagementInputObjectSchema), z.lazy(() => StaffingCandidateUpsertWithWhereUniqueWithoutEngagementInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => StaffingCandidateCreateManyEngagementInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => StaffingCandidateWhereUniqueInputObjectSchema), z.lazy(() => StaffingCandidateWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => StaffingCandidateWhereUniqueInputObjectSchema), z.lazy(() => StaffingCandidateWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => StaffingCandidateWhereUniqueInputObjectSchema), z.lazy(() => StaffingCandidateWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => StaffingCandidateWhereUniqueInputObjectSchema), z.lazy(() => StaffingCandidateWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => StaffingCandidateUpdateWithWhereUniqueWithoutEngagementInputObjectSchema), z.lazy(() => StaffingCandidateUpdateWithWhereUniqueWithoutEngagementInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => StaffingCandidateUpdateManyWithWhereWithoutEngagementInputObjectSchema), z.lazy(() => StaffingCandidateUpdateManyWithWhereWithoutEngagementInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => StaffingCandidateScalarWhereInputObjectSchema), z.lazy(() => StaffingCandidateScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const StaffingCandidateUncheckedUpdateManyWithoutEngagementNestedInputObjectSchema: z.ZodType<Prisma.StaffingCandidateUncheckedUpdateManyWithoutEngagementNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingCandidateUncheckedUpdateManyWithoutEngagementNestedInput>;
export const StaffingCandidateUncheckedUpdateManyWithoutEngagementNestedInputObjectZodSchema = makeSchema();
