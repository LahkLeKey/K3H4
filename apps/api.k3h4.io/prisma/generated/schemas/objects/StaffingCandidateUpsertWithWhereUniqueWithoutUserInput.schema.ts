import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingCandidateWhereUniqueInputObjectSchema as StaffingCandidateWhereUniqueInputObjectSchema } from './StaffingCandidateWhereUniqueInput.schema';
import { StaffingCandidateUpdateWithoutUserInputObjectSchema as StaffingCandidateUpdateWithoutUserInputObjectSchema } from './StaffingCandidateUpdateWithoutUserInput.schema';
import { StaffingCandidateUncheckedUpdateWithoutUserInputObjectSchema as StaffingCandidateUncheckedUpdateWithoutUserInputObjectSchema } from './StaffingCandidateUncheckedUpdateWithoutUserInput.schema';
import { StaffingCandidateCreateWithoutUserInputObjectSchema as StaffingCandidateCreateWithoutUserInputObjectSchema } from './StaffingCandidateCreateWithoutUserInput.schema';
import { StaffingCandidateUncheckedCreateWithoutUserInputObjectSchema as StaffingCandidateUncheckedCreateWithoutUserInputObjectSchema } from './StaffingCandidateUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingCandidateWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => StaffingCandidateUpdateWithoutUserInputObjectSchema), z.lazy(() => StaffingCandidateUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => StaffingCandidateCreateWithoutUserInputObjectSchema), z.lazy(() => StaffingCandidateUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const StaffingCandidateUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.StaffingCandidateUpsertWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingCandidateUpsertWithWhereUniqueWithoutUserInput>;
export const StaffingCandidateUpsertWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
