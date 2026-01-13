import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AssignmentTimecardCreateWithoutAssignmentInputObjectSchema as AssignmentTimecardCreateWithoutAssignmentInputObjectSchema } from './AssignmentTimecardCreateWithoutAssignmentInput.schema';
import { AssignmentTimecardUncheckedCreateWithoutAssignmentInputObjectSchema as AssignmentTimecardUncheckedCreateWithoutAssignmentInputObjectSchema } from './AssignmentTimecardUncheckedCreateWithoutAssignmentInput.schema';
import { AssignmentTimecardCreateOrConnectWithoutAssignmentInputObjectSchema as AssignmentTimecardCreateOrConnectWithoutAssignmentInputObjectSchema } from './AssignmentTimecardCreateOrConnectWithoutAssignmentInput.schema';
import { AssignmentTimecardCreateManyAssignmentInputEnvelopeObjectSchema as AssignmentTimecardCreateManyAssignmentInputEnvelopeObjectSchema } from './AssignmentTimecardCreateManyAssignmentInputEnvelope.schema';
import { AssignmentTimecardWhereUniqueInputObjectSchema as AssignmentTimecardWhereUniqueInputObjectSchema } from './AssignmentTimecardWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AssignmentTimecardCreateWithoutAssignmentInputObjectSchema), z.lazy(() => AssignmentTimecardCreateWithoutAssignmentInputObjectSchema).array(), z.lazy(() => AssignmentTimecardUncheckedCreateWithoutAssignmentInputObjectSchema), z.lazy(() => AssignmentTimecardUncheckedCreateWithoutAssignmentInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => AssignmentTimecardCreateOrConnectWithoutAssignmentInputObjectSchema), z.lazy(() => AssignmentTimecardCreateOrConnectWithoutAssignmentInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => AssignmentTimecardCreateManyAssignmentInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => AssignmentTimecardWhereUniqueInputObjectSchema), z.lazy(() => AssignmentTimecardWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const AssignmentTimecardCreateNestedManyWithoutAssignmentInputObjectSchema: z.ZodType<Prisma.AssignmentTimecardCreateNestedManyWithoutAssignmentInput> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentTimecardCreateNestedManyWithoutAssignmentInput>;
export const AssignmentTimecardCreateNestedManyWithoutAssignmentInputObjectZodSchema = makeSchema();
