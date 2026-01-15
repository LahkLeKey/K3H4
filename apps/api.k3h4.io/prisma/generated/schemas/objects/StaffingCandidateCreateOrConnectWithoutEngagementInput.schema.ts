import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingCandidateWhereUniqueInputObjectSchema as StaffingCandidateWhereUniqueInputObjectSchema } from './StaffingCandidateWhereUniqueInput.schema';
import { StaffingCandidateCreateWithoutEngagementInputObjectSchema as StaffingCandidateCreateWithoutEngagementInputObjectSchema } from './StaffingCandidateCreateWithoutEngagementInput.schema';
import { StaffingCandidateUncheckedCreateWithoutEngagementInputObjectSchema as StaffingCandidateUncheckedCreateWithoutEngagementInputObjectSchema } from './StaffingCandidateUncheckedCreateWithoutEngagementInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingCandidateWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => StaffingCandidateCreateWithoutEngagementInputObjectSchema), z.lazy(() => StaffingCandidateUncheckedCreateWithoutEngagementInputObjectSchema)])
}).strict();
export const StaffingCandidateCreateOrConnectWithoutEngagementInputObjectSchema: z.ZodType<Prisma.StaffingCandidateCreateOrConnectWithoutEngagementInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingCandidateCreateOrConnectWithoutEngagementInput>;
export const StaffingCandidateCreateOrConnectWithoutEngagementInputObjectZodSchema = makeSchema();
