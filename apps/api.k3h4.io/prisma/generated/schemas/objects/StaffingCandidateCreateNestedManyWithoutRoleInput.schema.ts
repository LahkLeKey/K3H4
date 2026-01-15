import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingCandidateCreateWithoutRoleInputObjectSchema as StaffingCandidateCreateWithoutRoleInputObjectSchema } from './StaffingCandidateCreateWithoutRoleInput.schema';
import { StaffingCandidateUncheckedCreateWithoutRoleInputObjectSchema as StaffingCandidateUncheckedCreateWithoutRoleInputObjectSchema } from './StaffingCandidateUncheckedCreateWithoutRoleInput.schema';
import { StaffingCandidateCreateOrConnectWithoutRoleInputObjectSchema as StaffingCandidateCreateOrConnectWithoutRoleInputObjectSchema } from './StaffingCandidateCreateOrConnectWithoutRoleInput.schema';
import { StaffingCandidateCreateManyRoleInputEnvelopeObjectSchema as StaffingCandidateCreateManyRoleInputEnvelopeObjectSchema } from './StaffingCandidateCreateManyRoleInputEnvelope.schema';
import { StaffingCandidateWhereUniqueInputObjectSchema as StaffingCandidateWhereUniqueInputObjectSchema } from './StaffingCandidateWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => StaffingCandidateCreateWithoutRoleInputObjectSchema), z.lazy(() => StaffingCandidateCreateWithoutRoleInputObjectSchema).array(), z.lazy(() => StaffingCandidateUncheckedCreateWithoutRoleInputObjectSchema), z.lazy(() => StaffingCandidateUncheckedCreateWithoutRoleInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => StaffingCandidateCreateOrConnectWithoutRoleInputObjectSchema), z.lazy(() => StaffingCandidateCreateOrConnectWithoutRoleInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => StaffingCandidateCreateManyRoleInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => StaffingCandidateWhereUniqueInputObjectSchema), z.lazy(() => StaffingCandidateWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const StaffingCandidateCreateNestedManyWithoutRoleInputObjectSchema: z.ZodType<Prisma.StaffingCandidateCreateNestedManyWithoutRoleInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingCandidateCreateNestedManyWithoutRoleInput>;
export const StaffingCandidateCreateNestedManyWithoutRoleInputObjectZodSchema = makeSchema();
