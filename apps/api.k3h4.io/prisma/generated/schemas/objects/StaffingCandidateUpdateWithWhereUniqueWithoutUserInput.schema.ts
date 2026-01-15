import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingCandidateWhereUniqueInputObjectSchema as StaffingCandidateWhereUniqueInputObjectSchema } from './StaffingCandidateWhereUniqueInput.schema';
import { StaffingCandidateUpdateWithoutUserInputObjectSchema as StaffingCandidateUpdateWithoutUserInputObjectSchema } from './StaffingCandidateUpdateWithoutUserInput.schema';
import { StaffingCandidateUncheckedUpdateWithoutUserInputObjectSchema as StaffingCandidateUncheckedUpdateWithoutUserInputObjectSchema } from './StaffingCandidateUncheckedUpdateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingCandidateWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => StaffingCandidateUpdateWithoutUserInputObjectSchema), z.lazy(() => StaffingCandidateUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const StaffingCandidateUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.StaffingCandidateUpdateWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingCandidateUpdateWithWhereUniqueWithoutUserInput>;
export const StaffingCandidateUpdateWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
