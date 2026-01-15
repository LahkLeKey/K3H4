import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingShiftCreateWithoutAssignedCandidateInputObjectSchema as StaffingShiftCreateWithoutAssignedCandidateInputObjectSchema } from './StaffingShiftCreateWithoutAssignedCandidateInput.schema';
import { StaffingShiftUncheckedCreateWithoutAssignedCandidateInputObjectSchema as StaffingShiftUncheckedCreateWithoutAssignedCandidateInputObjectSchema } from './StaffingShiftUncheckedCreateWithoutAssignedCandidateInput.schema';
import { StaffingShiftCreateOrConnectWithoutAssignedCandidateInputObjectSchema as StaffingShiftCreateOrConnectWithoutAssignedCandidateInputObjectSchema } from './StaffingShiftCreateOrConnectWithoutAssignedCandidateInput.schema';
import { StaffingShiftCreateManyAssignedCandidateInputEnvelopeObjectSchema as StaffingShiftCreateManyAssignedCandidateInputEnvelopeObjectSchema } from './StaffingShiftCreateManyAssignedCandidateInputEnvelope.schema';
import { StaffingShiftWhereUniqueInputObjectSchema as StaffingShiftWhereUniqueInputObjectSchema } from './StaffingShiftWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => StaffingShiftCreateWithoutAssignedCandidateInputObjectSchema), z.lazy(() => StaffingShiftCreateWithoutAssignedCandidateInputObjectSchema).array(), z.lazy(() => StaffingShiftUncheckedCreateWithoutAssignedCandidateInputObjectSchema), z.lazy(() => StaffingShiftUncheckedCreateWithoutAssignedCandidateInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => StaffingShiftCreateOrConnectWithoutAssignedCandidateInputObjectSchema), z.lazy(() => StaffingShiftCreateOrConnectWithoutAssignedCandidateInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => StaffingShiftCreateManyAssignedCandidateInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => StaffingShiftWhereUniqueInputObjectSchema), z.lazy(() => StaffingShiftWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const StaffingShiftCreateNestedManyWithoutAssignedCandidateInputObjectSchema: z.ZodType<Prisma.StaffingShiftCreateNestedManyWithoutAssignedCandidateInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingShiftCreateNestedManyWithoutAssignedCandidateInput>;
export const StaffingShiftCreateNestedManyWithoutAssignedCandidateInputObjectZodSchema = makeSchema();
