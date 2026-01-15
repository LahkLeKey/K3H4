import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingPlacementCreateWithoutCandidateInputObjectSchema as StaffingPlacementCreateWithoutCandidateInputObjectSchema } from './StaffingPlacementCreateWithoutCandidateInput.schema';
import { StaffingPlacementUncheckedCreateWithoutCandidateInputObjectSchema as StaffingPlacementUncheckedCreateWithoutCandidateInputObjectSchema } from './StaffingPlacementUncheckedCreateWithoutCandidateInput.schema';
import { StaffingPlacementCreateOrConnectWithoutCandidateInputObjectSchema as StaffingPlacementCreateOrConnectWithoutCandidateInputObjectSchema } from './StaffingPlacementCreateOrConnectWithoutCandidateInput.schema';
import { StaffingPlacementCreateManyCandidateInputEnvelopeObjectSchema as StaffingPlacementCreateManyCandidateInputEnvelopeObjectSchema } from './StaffingPlacementCreateManyCandidateInputEnvelope.schema';
import { StaffingPlacementWhereUniqueInputObjectSchema as StaffingPlacementWhereUniqueInputObjectSchema } from './StaffingPlacementWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => StaffingPlacementCreateWithoutCandidateInputObjectSchema), z.lazy(() => StaffingPlacementCreateWithoutCandidateInputObjectSchema).array(), z.lazy(() => StaffingPlacementUncheckedCreateWithoutCandidateInputObjectSchema), z.lazy(() => StaffingPlacementUncheckedCreateWithoutCandidateInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => StaffingPlacementCreateOrConnectWithoutCandidateInputObjectSchema), z.lazy(() => StaffingPlacementCreateOrConnectWithoutCandidateInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => StaffingPlacementCreateManyCandidateInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => StaffingPlacementWhereUniqueInputObjectSchema), z.lazy(() => StaffingPlacementWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const StaffingPlacementUncheckedCreateNestedManyWithoutCandidateInputObjectSchema: z.ZodType<Prisma.StaffingPlacementUncheckedCreateNestedManyWithoutCandidateInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingPlacementUncheckedCreateNestedManyWithoutCandidateInput>;
export const StaffingPlacementUncheckedCreateNestedManyWithoutCandidateInputObjectZodSchema = makeSchema();
