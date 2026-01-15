import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingCandidateWhereUniqueInputObjectSchema as StaffingCandidateWhereUniqueInputObjectSchema } from './StaffingCandidateWhereUniqueInput.schema';
import { StaffingCandidateCreateWithoutUserInputObjectSchema as StaffingCandidateCreateWithoutUserInputObjectSchema } from './StaffingCandidateCreateWithoutUserInput.schema';
import { StaffingCandidateUncheckedCreateWithoutUserInputObjectSchema as StaffingCandidateUncheckedCreateWithoutUserInputObjectSchema } from './StaffingCandidateUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingCandidateWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => StaffingCandidateCreateWithoutUserInputObjectSchema), z.lazy(() => StaffingCandidateUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const StaffingCandidateCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.StaffingCandidateCreateOrConnectWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingCandidateCreateOrConnectWithoutUserInput>;
export const StaffingCandidateCreateOrConnectWithoutUserInputObjectZodSchema = makeSchema();
