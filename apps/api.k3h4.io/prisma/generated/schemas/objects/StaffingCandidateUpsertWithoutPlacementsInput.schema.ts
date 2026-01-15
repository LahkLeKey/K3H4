import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingCandidateUpdateWithoutPlacementsInputObjectSchema as StaffingCandidateUpdateWithoutPlacementsInputObjectSchema } from './StaffingCandidateUpdateWithoutPlacementsInput.schema';
import { StaffingCandidateUncheckedUpdateWithoutPlacementsInputObjectSchema as StaffingCandidateUncheckedUpdateWithoutPlacementsInputObjectSchema } from './StaffingCandidateUncheckedUpdateWithoutPlacementsInput.schema';
import { StaffingCandidateCreateWithoutPlacementsInputObjectSchema as StaffingCandidateCreateWithoutPlacementsInputObjectSchema } from './StaffingCandidateCreateWithoutPlacementsInput.schema';
import { StaffingCandidateUncheckedCreateWithoutPlacementsInputObjectSchema as StaffingCandidateUncheckedCreateWithoutPlacementsInputObjectSchema } from './StaffingCandidateUncheckedCreateWithoutPlacementsInput.schema';
import { StaffingCandidateWhereInputObjectSchema as StaffingCandidateWhereInputObjectSchema } from './StaffingCandidateWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => StaffingCandidateUpdateWithoutPlacementsInputObjectSchema), z.lazy(() => StaffingCandidateUncheckedUpdateWithoutPlacementsInputObjectSchema)]),
  create: z.union([z.lazy(() => StaffingCandidateCreateWithoutPlacementsInputObjectSchema), z.lazy(() => StaffingCandidateUncheckedCreateWithoutPlacementsInputObjectSchema)]),
  where: z.lazy(() => StaffingCandidateWhereInputObjectSchema).optional()
}).strict();
export const StaffingCandidateUpsertWithoutPlacementsInputObjectSchema: z.ZodType<Prisma.StaffingCandidateUpsertWithoutPlacementsInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingCandidateUpsertWithoutPlacementsInput>;
export const StaffingCandidateUpsertWithoutPlacementsInputObjectZodSchema = makeSchema();
