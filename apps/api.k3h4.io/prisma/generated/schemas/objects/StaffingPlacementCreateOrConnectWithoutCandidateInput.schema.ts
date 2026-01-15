import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingPlacementWhereUniqueInputObjectSchema as StaffingPlacementWhereUniqueInputObjectSchema } from './StaffingPlacementWhereUniqueInput.schema';
import { StaffingPlacementCreateWithoutCandidateInputObjectSchema as StaffingPlacementCreateWithoutCandidateInputObjectSchema } from './StaffingPlacementCreateWithoutCandidateInput.schema';
import { StaffingPlacementUncheckedCreateWithoutCandidateInputObjectSchema as StaffingPlacementUncheckedCreateWithoutCandidateInputObjectSchema } from './StaffingPlacementUncheckedCreateWithoutCandidateInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingPlacementWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => StaffingPlacementCreateWithoutCandidateInputObjectSchema), z.lazy(() => StaffingPlacementUncheckedCreateWithoutCandidateInputObjectSchema)])
}).strict();
export const StaffingPlacementCreateOrConnectWithoutCandidateInputObjectSchema: z.ZodType<Prisma.StaffingPlacementCreateOrConnectWithoutCandidateInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingPlacementCreateOrConnectWithoutCandidateInput>;
export const StaffingPlacementCreateOrConnectWithoutCandidateInputObjectZodSchema = makeSchema();
