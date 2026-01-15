import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingPlacementWhereUniqueInputObjectSchema as StaffingPlacementWhereUniqueInputObjectSchema } from './StaffingPlacementWhereUniqueInput.schema';
import { StaffingPlacementUpdateWithoutCandidateInputObjectSchema as StaffingPlacementUpdateWithoutCandidateInputObjectSchema } from './StaffingPlacementUpdateWithoutCandidateInput.schema';
import { StaffingPlacementUncheckedUpdateWithoutCandidateInputObjectSchema as StaffingPlacementUncheckedUpdateWithoutCandidateInputObjectSchema } from './StaffingPlacementUncheckedUpdateWithoutCandidateInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingPlacementWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => StaffingPlacementUpdateWithoutCandidateInputObjectSchema), z.lazy(() => StaffingPlacementUncheckedUpdateWithoutCandidateInputObjectSchema)])
}).strict();
export const StaffingPlacementUpdateWithWhereUniqueWithoutCandidateInputObjectSchema: z.ZodType<Prisma.StaffingPlacementUpdateWithWhereUniqueWithoutCandidateInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingPlacementUpdateWithWhereUniqueWithoutCandidateInput>;
export const StaffingPlacementUpdateWithWhereUniqueWithoutCandidateInputObjectZodSchema = makeSchema();
