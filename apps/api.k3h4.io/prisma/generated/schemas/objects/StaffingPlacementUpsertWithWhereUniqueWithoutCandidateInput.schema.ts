import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingPlacementWhereUniqueInputObjectSchema as StaffingPlacementWhereUniqueInputObjectSchema } from './StaffingPlacementWhereUniqueInput.schema';
import { StaffingPlacementUpdateWithoutCandidateInputObjectSchema as StaffingPlacementUpdateWithoutCandidateInputObjectSchema } from './StaffingPlacementUpdateWithoutCandidateInput.schema';
import { StaffingPlacementUncheckedUpdateWithoutCandidateInputObjectSchema as StaffingPlacementUncheckedUpdateWithoutCandidateInputObjectSchema } from './StaffingPlacementUncheckedUpdateWithoutCandidateInput.schema';
import { StaffingPlacementCreateWithoutCandidateInputObjectSchema as StaffingPlacementCreateWithoutCandidateInputObjectSchema } from './StaffingPlacementCreateWithoutCandidateInput.schema';
import { StaffingPlacementUncheckedCreateWithoutCandidateInputObjectSchema as StaffingPlacementUncheckedCreateWithoutCandidateInputObjectSchema } from './StaffingPlacementUncheckedCreateWithoutCandidateInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingPlacementWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => StaffingPlacementUpdateWithoutCandidateInputObjectSchema), z.lazy(() => StaffingPlacementUncheckedUpdateWithoutCandidateInputObjectSchema)]),
  create: z.union([z.lazy(() => StaffingPlacementCreateWithoutCandidateInputObjectSchema), z.lazy(() => StaffingPlacementUncheckedCreateWithoutCandidateInputObjectSchema)])
}).strict();
export const StaffingPlacementUpsertWithWhereUniqueWithoutCandidateInputObjectSchema: z.ZodType<Prisma.StaffingPlacementUpsertWithWhereUniqueWithoutCandidateInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingPlacementUpsertWithWhereUniqueWithoutCandidateInput>;
export const StaffingPlacementUpsertWithWhereUniqueWithoutCandidateInputObjectZodSchema = makeSchema();
