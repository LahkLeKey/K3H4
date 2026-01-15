import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingCandidateWhereUniqueInputObjectSchema as StaffingCandidateWhereUniqueInputObjectSchema } from './StaffingCandidateWhereUniqueInput.schema';
import { StaffingCandidateCreateWithoutRoleInputObjectSchema as StaffingCandidateCreateWithoutRoleInputObjectSchema } from './StaffingCandidateCreateWithoutRoleInput.schema';
import { StaffingCandidateUncheckedCreateWithoutRoleInputObjectSchema as StaffingCandidateUncheckedCreateWithoutRoleInputObjectSchema } from './StaffingCandidateUncheckedCreateWithoutRoleInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingCandidateWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => StaffingCandidateCreateWithoutRoleInputObjectSchema), z.lazy(() => StaffingCandidateUncheckedCreateWithoutRoleInputObjectSchema)])
}).strict();
export const StaffingCandidateCreateOrConnectWithoutRoleInputObjectSchema: z.ZodType<Prisma.StaffingCandidateCreateOrConnectWithoutRoleInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingCandidateCreateOrConnectWithoutRoleInput>;
export const StaffingCandidateCreateOrConnectWithoutRoleInputObjectZodSchema = makeSchema();
