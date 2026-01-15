import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingPlacementCreateWithoutCandidateInputObjectSchema as StaffingPlacementCreateWithoutCandidateInputObjectSchema } from './StaffingPlacementCreateWithoutCandidateInput.schema';
import { StaffingPlacementUncheckedCreateWithoutCandidateInputObjectSchema as StaffingPlacementUncheckedCreateWithoutCandidateInputObjectSchema } from './StaffingPlacementUncheckedCreateWithoutCandidateInput.schema';
import { StaffingPlacementCreateOrConnectWithoutCandidateInputObjectSchema as StaffingPlacementCreateOrConnectWithoutCandidateInputObjectSchema } from './StaffingPlacementCreateOrConnectWithoutCandidateInput.schema';
import { StaffingPlacementUpsertWithWhereUniqueWithoutCandidateInputObjectSchema as StaffingPlacementUpsertWithWhereUniqueWithoutCandidateInputObjectSchema } from './StaffingPlacementUpsertWithWhereUniqueWithoutCandidateInput.schema';
import { StaffingPlacementCreateManyCandidateInputEnvelopeObjectSchema as StaffingPlacementCreateManyCandidateInputEnvelopeObjectSchema } from './StaffingPlacementCreateManyCandidateInputEnvelope.schema';
import { StaffingPlacementWhereUniqueInputObjectSchema as StaffingPlacementWhereUniqueInputObjectSchema } from './StaffingPlacementWhereUniqueInput.schema';
import { StaffingPlacementUpdateWithWhereUniqueWithoutCandidateInputObjectSchema as StaffingPlacementUpdateWithWhereUniqueWithoutCandidateInputObjectSchema } from './StaffingPlacementUpdateWithWhereUniqueWithoutCandidateInput.schema';
import { StaffingPlacementUpdateManyWithWhereWithoutCandidateInputObjectSchema as StaffingPlacementUpdateManyWithWhereWithoutCandidateInputObjectSchema } from './StaffingPlacementUpdateManyWithWhereWithoutCandidateInput.schema';
import { StaffingPlacementScalarWhereInputObjectSchema as StaffingPlacementScalarWhereInputObjectSchema } from './StaffingPlacementScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => StaffingPlacementCreateWithoutCandidateInputObjectSchema), z.lazy(() => StaffingPlacementCreateWithoutCandidateInputObjectSchema).array(), z.lazy(() => StaffingPlacementUncheckedCreateWithoutCandidateInputObjectSchema), z.lazy(() => StaffingPlacementUncheckedCreateWithoutCandidateInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => StaffingPlacementCreateOrConnectWithoutCandidateInputObjectSchema), z.lazy(() => StaffingPlacementCreateOrConnectWithoutCandidateInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => StaffingPlacementUpsertWithWhereUniqueWithoutCandidateInputObjectSchema), z.lazy(() => StaffingPlacementUpsertWithWhereUniqueWithoutCandidateInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => StaffingPlacementCreateManyCandidateInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => StaffingPlacementWhereUniqueInputObjectSchema), z.lazy(() => StaffingPlacementWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => StaffingPlacementWhereUniqueInputObjectSchema), z.lazy(() => StaffingPlacementWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => StaffingPlacementWhereUniqueInputObjectSchema), z.lazy(() => StaffingPlacementWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => StaffingPlacementWhereUniqueInputObjectSchema), z.lazy(() => StaffingPlacementWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => StaffingPlacementUpdateWithWhereUniqueWithoutCandidateInputObjectSchema), z.lazy(() => StaffingPlacementUpdateWithWhereUniqueWithoutCandidateInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => StaffingPlacementUpdateManyWithWhereWithoutCandidateInputObjectSchema), z.lazy(() => StaffingPlacementUpdateManyWithWhereWithoutCandidateInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => StaffingPlacementScalarWhereInputObjectSchema), z.lazy(() => StaffingPlacementScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const StaffingPlacementUpdateManyWithoutCandidateNestedInputObjectSchema: z.ZodType<Prisma.StaffingPlacementUpdateManyWithoutCandidateNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingPlacementUpdateManyWithoutCandidateNestedInput>;
export const StaffingPlacementUpdateManyWithoutCandidateNestedInputObjectZodSchema = makeSchema();
