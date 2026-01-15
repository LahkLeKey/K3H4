import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingCandidateWhereInputObjectSchema as StaffingCandidateWhereInputObjectSchema } from './StaffingCandidateWhereInput.schema';
import { StaffingCandidateUpdateWithoutPlacementsInputObjectSchema as StaffingCandidateUpdateWithoutPlacementsInputObjectSchema } from './StaffingCandidateUpdateWithoutPlacementsInput.schema';
import { StaffingCandidateUncheckedUpdateWithoutPlacementsInputObjectSchema as StaffingCandidateUncheckedUpdateWithoutPlacementsInputObjectSchema } from './StaffingCandidateUncheckedUpdateWithoutPlacementsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingCandidateWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => StaffingCandidateUpdateWithoutPlacementsInputObjectSchema), z.lazy(() => StaffingCandidateUncheckedUpdateWithoutPlacementsInputObjectSchema)])
}).strict();
export const StaffingCandidateUpdateToOneWithWhereWithoutPlacementsInputObjectSchema: z.ZodType<Prisma.StaffingCandidateUpdateToOneWithWhereWithoutPlacementsInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingCandidateUpdateToOneWithWhereWithoutPlacementsInput>;
export const StaffingCandidateUpdateToOneWithWhereWithoutPlacementsInputObjectZodSchema = makeSchema();
