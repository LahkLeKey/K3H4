import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingCandidateWhereUniqueInputObjectSchema as StaffingCandidateWhereUniqueInputObjectSchema } from './StaffingCandidateWhereUniqueInput.schema';
import { StaffingCandidateCreateWithoutPlacementsInputObjectSchema as StaffingCandidateCreateWithoutPlacementsInputObjectSchema } from './StaffingCandidateCreateWithoutPlacementsInput.schema';
import { StaffingCandidateUncheckedCreateWithoutPlacementsInputObjectSchema as StaffingCandidateUncheckedCreateWithoutPlacementsInputObjectSchema } from './StaffingCandidateUncheckedCreateWithoutPlacementsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingCandidateWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => StaffingCandidateCreateWithoutPlacementsInputObjectSchema), z.lazy(() => StaffingCandidateUncheckedCreateWithoutPlacementsInputObjectSchema)])
}).strict();
export const StaffingCandidateCreateOrConnectWithoutPlacementsInputObjectSchema: z.ZodType<Prisma.StaffingCandidateCreateOrConnectWithoutPlacementsInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingCandidateCreateOrConnectWithoutPlacementsInput>;
export const StaffingCandidateCreateOrConnectWithoutPlacementsInputObjectZodSchema = makeSchema();
