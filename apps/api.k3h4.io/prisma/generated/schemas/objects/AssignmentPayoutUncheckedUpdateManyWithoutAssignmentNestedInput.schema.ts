import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AssignmentPayoutCreateWithoutAssignmentInputObjectSchema as AssignmentPayoutCreateWithoutAssignmentInputObjectSchema } from './AssignmentPayoutCreateWithoutAssignmentInput.schema';
import { AssignmentPayoutUncheckedCreateWithoutAssignmentInputObjectSchema as AssignmentPayoutUncheckedCreateWithoutAssignmentInputObjectSchema } from './AssignmentPayoutUncheckedCreateWithoutAssignmentInput.schema';
import { AssignmentPayoutCreateOrConnectWithoutAssignmentInputObjectSchema as AssignmentPayoutCreateOrConnectWithoutAssignmentInputObjectSchema } from './AssignmentPayoutCreateOrConnectWithoutAssignmentInput.schema';
import { AssignmentPayoutUpsertWithWhereUniqueWithoutAssignmentInputObjectSchema as AssignmentPayoutUpsertWithWhereUniqueWithoutAssignmentInputObjectSchema } from './AssignmentPayoutUpsertWithWhereUniqueWithoutAssignmentInput.schema';
import { AssignmentPayoutCreateManyAssignmentInputEnvelopeObjectSchema as AssignmentPayoutCreateManyAssignmentInputEnvelopeObjectSchema } from './AssignmentPayoutCreateManyAssignmentInputEnvelope.schema';
import { AssignmentPayoutWhereUniqueInputObjectSchema as AssignmentPayoutWhereUniqueInputObjectSchema } from './AssignmentPayoutWhereUniqueInput.schema';
import { AssignmentPayoutUpdateWithWhereUniqueWithoutAssignmentInputObjectSchema as AssignmentPayoutUpdateWithWhereUniqueWithoutAssignmentInputObjectSchema } from './AssignmentPayoutUpdateWithWhereUniqueWithoutAssignmentInput.schema';
import { AssignmentPayoutUpdateManyWithWhereWithoutAssignmentInputObjectSchema as AssignmentPayoutUpdateManyWithWhereWithoutAssignmentInputObjectSchema } from './AssignmentPayoutUpdateManyWithWhereWithoutAssignmentInput.schema';
import { AssignmentPayoutScalarWhereInputObjectSchema as AssignmentPayoutScalarWhereInputObjectSchema } from './AssignmentPayoutScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AssignmentPayoutCreateWithoutAssignmentInputObjectSchema), z.lazy(() => AssignmentPayoutCreateWithoutAssignmentInputObjectSchema).array(), z.lazy(() => AssignmentPayoutUncheckedCreateWithoutAssignmentInputObjectSchema), z.lazy(() => AssignmentPayoutUncheckedCreateWithoutAssignmentInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => AssignmentPayoutCreateOrConnectWithoutAssignmentInputObjectSchema), z.lazy(() => AssignmentPayoutCreateOrConnectWithoutAssignmentInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => AssignmentPayoutUpsertWithWhereUniqueWithoutAssignmentInputObjectSchema), z.lazy(() => AssignmentPayoutUpsertWithWhereUniqueWithoutAssignmentInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => AssignmentPayoutCreateManyAssignmentInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => AssignmentPayoutWhereUniqueInputObjectSchema), z.lazy(() => AssignmentPayoutWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => AssignmentPayoutWhereUniqueInputObjectSchema), z.lazy(() => AssignmentPayoutWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => AssignmentPayoutWhereUniqueInputObjectSchema), z.lazy(() => AssignmentPayoutWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => AssignmentPayoutWhereUniqueInputObjectSchema), z.lazy(() => AssignmentPayoutWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => AssignmentPayoutUpdateWithWhereUniqueWithoutAssignmentInputObjectSchema), z.lazy(() => AssignmentPayoutUpdateWithWhereUniqueWithoutAssignmentInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => AssignmentPayoutUpdateManyWithWhereWithoutAssignmentInputObjectSchema), z.lazy(() => AssignmentPayoutUpdateManyWithWhereWithoutAssignmentInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => AssignmentPayoutScalarWhereInputObjectSchema), z.lazy(() => AssignmentPayoutScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const AssignmentPayoutUncheckedUpdateManyWithoutAssignmentNestedInputObjectSchema: z.ZodType<Prisma.AssignmentPayoutUncheckedUpdateManyWithoutAssignmentNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentPayoutUncheckedUpdateManyWithoutAssignmentNestedInput>;
export const AssignmentPayoutUncheckedUpdateManyWithoutAssignmentNestedInputObjectZodSchema = makeSchema();
