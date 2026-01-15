import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingCandidateCreateWithoutEngagementInputObjectSchema as StaffingCandidateCreateWithoutEngagementInputObjectSchema } from './StaffingCandidateCreateWithoutEngagementInput.schema';
import { StaffingCandidateUncheckedCreateWithoutEngagementInputObjectSchema as StaffingCandidateUncheckedCreateWithoutEngagementInputObjectSchema } from './StaffingCandidateUncheckedCreateWithoutEngagementInput.schema';
import { StaffingCandidateCreateOrConnectWithoutEngagementInputObjectSchema as StaffingCandidateCreateOrConnectWithoutEngagementInputObjectSchema } from './StaffingCandidateCreateOrConnectWithoutEngagementInput.schema';
import { StaffingCandidateCreateManyEngagementInputEnvelopeObjectSchema as StaffingCandidateCreateManyEngagementInputEnvelopeObjectSchema } from './StaffingCandidateCreateManyEngagementInputEnvelope.schema';
import { StaffingCandidateWhereUniqueInputObjectSchema as StaffingCandidateWhereUniqueInputObjectSchema } from './StaffingCandidateWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => StaffingCandidateCreateWithoutEngagementInputObjectSchema), z.lazy(() => StaffingCandidateCreateWithoutEngagementInputObjectSchema).array(), z.lazy(() => StaffingCandidateUncheckedCreateWithoutEngagementInputObjectSchema), z.lazy(() => StaffingCandidateUncheckedCreateWithoutEngagementInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => StaffingCandidateCreateOrConnectWithoutEngagementInputObjectSchema), z.lazy(() => StaffingCandidateCreateOrConnectWithoutEngagementInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => StaffingCandidateCreateManyEngagementInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => StaffingCandidateWhereUniqueInputObjectSchema), z.lazy(() => StaffingCandidateWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const StaffingCandidateUncheckedCreateNestedManyWithoutEngagementInputObjectSchema: z.ZodType<Prisma.StaffingCandidateUncheckedCreateNestedManyWithoutEngagementInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingCandidateUncheckedCreateNestedManyWithoutEngagementInput>;
export const StaffingCandidateUncheckedCreateNestedManyWithoutEngagementInputObjectZodSchema = makeSchema();
