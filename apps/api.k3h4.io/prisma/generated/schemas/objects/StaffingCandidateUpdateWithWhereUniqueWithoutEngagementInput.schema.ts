import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingCandidateWhereUniqueInputObjectSchema as StaffingCandidateWhereUniqueInputObjectSchema } from './StaffingCandidateWhereUniqueInput.schema';
import { StaffingCandidateUpdateWithoutEngagementInputObjectSchema as StaffingCandidateUpdateWithoutEngagementInputObjectSchema } from './StaffingCandidateUpdateWithoutEngagementInput.schema';
import { StaffingCandidateUncheckedUpdateWithoutEngagementInputObjectSchema as StaffingCandidateUncheckedUpdateWithoutEngagementInputObjectSchema } from './StaffingCandidateUncheckedUpdateWithoutEngagementInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingCandidateWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => StaffingCandidateUpdateWithoutEngagementInputObjectSchema), z.lazy(() => StaffingCandidateUncheckedUpdateWithoutEngagementInputObjectSchema)])
}).strict();
export const StaffingCandidateUpdateWithWhereUniqueWithoutEngagementInputObjectSchema: z.ZodType<Prisma.StaffingCandidateUpdateWithWhereUniqueWithoutEngagementInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingCandidateUpdateWithWhereUniqueWithoutEngagementInput>;
export const StaffingCandidateUpdateWithWhereUniqueWithoutEngagementInputObjectZodSchema = makeSchema();
