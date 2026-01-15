import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingShiftCreateWithoutAssignedCandidateInputObjectSchema as StaffingShiftCreateWithoutAssignedCandidateInputObjectSchema } from './StaffingShiftCreateWithoutAssignedCandidateInput.schema';
import { StaffingShiftUncheckedCreateWithoutAssignedCandidateInputObjectSchema as StaffingShiftUncheckedCreateWithoutAssignedCandidateInputObjectSchema } from './StaffingShiftUncheckedCreateWithoutAssignedCandidateInput.schema';
import { StaffingShiftCreateOrConnectWithoutAssignedCandidateInputObjectSchema as StaffingShiftCreateOrConnectWithoutAssignedCandidateInputObjectSchema } from './StaffingShiftCreateOrConnectWithoutAssignedCandidateInput.schema';
import { StaffingShiftUpsertWithWhereUniqueWithoutAssignedCandidateInputObjectSchema as StaffingShiftUpsertWithWhereUniqueWithoutAssignedCandidateInputObjectSchema } from './StaffingShiftUpsertWithWhereUniqueWithoutAssignedCandidateInput.schema';
import { StaffingShiftCreateManyAssignedCandidateInputEnvelopeObjectSchema as StaffingShiftCreateManyAssignedCandidateInputEnvelopeObjectSchema } from './StaffingShiftCreateManyAssignedCandidateInputEnvelope.schema';
import { StaffingShiftWhereUniqueInputObjectSchema as StaffingShiftWhereUniqueInputObjectSchema } from './StaffingShiftWhereUniqueInput.schema';
import { StaffingShiftUpdateWithWhereUniqueWithoutAssignedCandidateInputObjectSchema as StaffingShiftUpdateWithWhereUniqueWithoutAssignedCandidateInputObjectSchema } from './StaffingShiftUpdateWithWhereUniqueWithoutAssignedCandidateInput.schema';
import { StaffingShiftUpdateManyWithWhereWithoutAssignedCandidateInputObjectSchema as StaffingShiftUpdateManyWithWhereWithoutAssignedCandidateInputObjectSchema } from './StaffingShiftUpdateManyWithWhereWithoutAssignedCandidateInput.schema';
import { StaffingShiftScalarWhereInputObjectSchema as StaffingShiftScalarWhereInputObjectSchema } from './StaffingShiftScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => StaffingShiftCreateWithoutAssignedCandidateInputObjectSchema), z.lazy(() => StaffingShiftCreateWithoutAssignedCandidateInputObjectSchema).array(), z.lazy(() => StaffingShiftUncheckedCreateWithoutAssignedCandidateInputObjectSchema), z.lazy(() => StaffingShiftUncheckedCreateWithoutAssignedCandidateInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => StaffingShiftCreateOrConnectWithoutAssignedCandidateInputObjectSchema), z.lazy(() => StaffingShiftCreateOrConnectWithoutAssignedCandidateInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => StaffingShiftUpsertWithWhereUniqueWithoutAssignedCandidateInputObjectSchema), z.lazy(() => StaffingShiftUpsertWithWhereUniqueWithoutAssignedCandidateInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => StaffingShiftCreateManyAssignedCandidateInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => StaffingShiftWhereUniqueInputObjectSchema), z.lazy(() => StaffingShiftWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => StaffingShiftWhereUniqueInputObjectSchema), z.lazy(() => StaffingShiftWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => StaffingShiftWhereUniqueInputObjectSchema), z.lazy(() => StaffingShiftWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => StaffingShiftWhereUniqueInputObjectSchema), z.lazy(() => StaffingShiftWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => StaffingShiftUpdateWithWhereUniqueWithoutAssignedCandidateInputObjectSchema), z.lazy(() => StaffingShiftUpdateWithWhereUniqueWithoutAssignedCandidateInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => StaffingShiftUpdateManyWithWhereWithoutAssignedCandidateInputObjectSchema), z.lazy(() => StaffingShiftUpdateManyWithWhereWithoutAssignedCandidateInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => StaffingShiftScalarWhereInputObjectSchema), z.lazy(() => StaffingShiftScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const StaffingShiftUpdateManyWithoutAssignedCandidateNestedInputObjectSchema: z.ZodType<Prisma.StaffingShiftUpdateManyWithoutAssignedCandidateNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingShiftUpdateManyWithoutAssignedCandidateNestedInput>;
export const StaffingShiftUpdateManyWithoutAssignedCandidateNestedInputObjectZodSchema = makeSchema();
