import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingCandidateWhereUniqueInputObjectSchema as StaffingCandidateWhereUniqueInputObjectSchema } from './StaffingCandidateWhereUniqueInput.schema';
import { StaffingCandidateUpdateWithoutEngagementInputObjectSchema as StaffingCandidateUpdateWithoutEngagementInputObjectSchema } from './StaffingCandidateUpdateWithoutEngagementInput.schema';
import { StaffingCandidateUncheckedUpdateWithoutEngagementInputObjectSchema as StaffingCandidateUncheckedUpdateWithoutEngagementInputObjectSchema } from './StaffingCandidateUncheckedUpdateWithoutEngagementInput.schema';
import { StaffingCandidateCreateWithoutEngagementInputObjectSchema as StaffingCandidateCreateWithoutEngagementInputObjectSchema } from './StaffingCandidateCreateWithoutEngagementInput.schema';
import { StaffingCandidateUncheckedCreateWithoutEngagementInputObjectSchema as StaffingCandidateUncheckedCreateWithoutEngagementInputObjectSchema } from './StaffingCandidateUncheckedCreateWithoutEngagementInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingCandidateWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => StaffingCandidateUpdateWithoutEngagementInputObjectSchema), z.lazy(() => StaffingCandidateUncheckedUpdateWithoutEngagementInputObjectSchema)]),
  create: z.union([z.lazy(() => StaffingCandidateCreateWithoutEngagementInputObjectSchema), z.lazy(() => StaffingCandidateUncheckedCreateWithoutEngagementInputObjectSchema)])
}).strict();
export const StaffingCandidateUpsertWithWhereUniqueWithoutEngagementInputObjectSchema: z.ZodType<Prisma.StaffingCandidateUpsertWithWhereUniqueWithoutEngagementInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingCandidateUpsertWithWhereUniqueWithoutEngagementInput>;
export const StaffingCandidateUpsertWithWhereUniqueWithoutEngagementInputObjectZodSchema = makeSchema();
