import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AssignmentTimecardCreateWithoutAssignmentInputObjectSchema as AssignmentTimecardCreateWithoutAssignmentInputObjectSchema } from './AssignmentTimecardCreateWithoutAssignmentInput.schema';
import { AssignmentTimecardUncheckedCreateWithoutAssignmentInputObjectSchema as AssignmentTimecardUncheckedCreateWithoutAssignmentInputObjectSchema } from './AssignmentTimecardUncheckedCreateWithoutAssignmentInput.schema';
import { AssignmentTimecardCreateOrConnectWithoutAssignmentInputObjectSchema as AssignmentTimecardCreateOrConnectWithoutAssignmentInputObjectSchema } from './AssignmentTimecardCreateOrConnectWithoutAssignmentInput.schema';
import { AssignmentTimecardUpsertWithWhereUniqueWithoutAssignmentInputObjectSchema as AssignmentTimecardUpsertWithWhereUniqueWithoutAssignmentInputObjectSchema } from './AssignmentTimecardUpsertWithWhereUniqueWithoutAssignmentInput.schema';
import { AssignmentTimecardCreateManyAssignmentInputEnvelopeObjectSchema as AssignmentTimecardCreateManyAssignmentInputEnvelopeObjectSchema } from './AssignmentTimecardCreateManyAssignmentInputEnvelope.schema';
import { AssignmentTimecardWhereUniqueInputObjectSchema as AssignmentTimecardWhereUniqueInputObjectSchema } from './AssignmentTimecardWhereUniqueInput.schema';
import { AssignmentTimecardUpdateWithWhereUniqueWithoutAssignmentInputObjectSchema as AssignmentTimecardUpdateWithWhereUniqueWithoutAssignmentInputObjectSchema } from './AssignmentTimecardUpdateWithWhereUniqueWithoutAssignmentInput.schema';
import { AssignmentTimecardUpdateManyWithWhereWithoutAssignmentInputObjectSchema as AssignmentTimecardUpdateManyWithWhereWithoutAssignmentInputObjectSchema } from './AssignmentTimecardUpdateManyWithWhereWithoutAssignmentInput.schema';
import { AssignmentTimecardScalarWhereInputObjectSchema as AssignmentTimecardScalarWhereInputObjectSchema } from './AssignmentTimecardScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AssignmentTimecardCreateWithoutAssignmentInputObjectSchema), z.lazy(() => AssignmentTimecardCreateWithoutAssignmentInputObjectSchema).array(), z.lazy(() => AssignmentTimecardUncheckedCreateWithoutAssignmentInputObjectSchema), z.lazy(() => AssignmentTimecardUncheckedCreateWithoutAssignmentInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => AssignmentTimecardCreateOrConnectWithoutAssignmentInputObjectSchema), z.lazy(() => AssignmentTimecardCreateOrConnectWithoutAssignmentInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => AssignmentTimecardUpsertWithWhereUniqueWithoutAssignmentInputObjectSchema), z.lazy(() => AssignmentTimecardUpsertWithWhereUniqueWithoutAssignmentInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => AssignmentTimecardCreateManyAssignmentInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => AssignmentTimecardWhereUniqueInputObjectSchema), z.lazy(() => AssignmentTimecardWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => AssignmentTimecardWhereUniqueInputObjectSchema), z.lazy(() => AssignmentTimecardWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => AssignmentTimecardWhereUniqueInputObjectSchema), z.lazy(() => AssignmentTimecardWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => AssignmentTimecardWhereUniqueInputObjectSchema), z.lazy(() => AssignmentTimecardWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => AssignmentTimecardUpdateWithWhereUniqueWithoutAssignmentInputObjectSchema), z.lazy(() => AssignmentTimecardUpdateWithWhereUniqueWithoutAssignmentInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => AssignmentTimecardUpdateManyWithWhereWithoutAssignmentInputObjectSchema), z.lazy(() => AssignmentTimecardUpdateManyWithWhereWithoutAssignmentInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => AssignmentTimecardScalarWhereInputObjectSchema), z.lazy(() => AssignmentTimecardScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const AssignmentTimecardUpdateManyWithoutAssignmentNestedInputObjectSchema: z.ZodType<Prisma.AssignmentTimecardUpdateManyWithoutAssignmentNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentTimecardUpdateManyWithoutAssignmentNestedInput>;
export const AssignmentTimecardUpdateManyWithoutAssignmentNestedInputObjectZodSchema = makeSchema();
