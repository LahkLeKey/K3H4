import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AssignmentCreateWithoutUserInputObjectSchema as AssignmentCreateWithoutUserInputObjectSchema } from './AssignmentCreateWithoutUserInput.schema';
import { AssignmentUncheckedCreateWithoutUserInputObjectSchema as AssignmentUncheckedCreateWithoutUserInputObjectSchema } from './AssignmentUncheckedCreateWithoutUserInput.schema';
import { AssignmentCreateOrConnectWithoutUserInputObjectSchema as AssignmentCreateOrConnectWithoutUserInputObjectSchema } from './AssignmentCreateOrConnectWithoutUserInput.schema';
import { AssignmentUpsertWithWhereUniqueWithoutUserInputObjectSchema as AssignmentUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './AssignmentUpsertWithWhereUniqueWithoutUserInput.schema';
import { AssignmentCreateManyUserInputEnvelopeObjectSchema as AssignmentCreateManyUserInputEnvelopeObjectSchema } from './AssignmentCreateManyUserInputEnvelope.schema';
import { AssignmentWhereUniqueInputObjectSchema as AssignmentWhereUniqueInputObjectSchema } from './AssignmentWhereUniqueInput.schema';
import { AssignmentUpdateWithWhereUniqueWithoutUserInputObjectSchema as AssignmentUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './AssignmentUpdateWithWhereUniqueWithoutUserInput.schema';
import { AssignmentUpdateManyWithWhereWithoutUserInputObjectSchema as AssignmentUpdateManyWithWhereWithoutUserInputObjectSchema } from './AssignmentUpdateManyWithWhereWithoutUserInput.schema';
import { AssignmentScalarWhereInputObjectSchema as AssignmentScalarWhereInputObjectSchema } from './AssignmentScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AssignmentCreateWithoutUserInputObjectSchema), z.lazy(() => AssignmentCreateWithoutUserInputObjectSchema).array(), z.lazy(() => AssignmentUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => AssignmentUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => AssignmentCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => AssignmentCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => AssignmentUpsertWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => AssignmentUpsertWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => AssignmentCreateManyUserInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => AssignmentWhereUniqueInputObjectSchema), z.lazy(() => AssignmentWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => AssignmentWhereUniqueInputObjectSchema), z.lazy(() => AssignmentWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => AssignmentWhereUniqueInputObjectSchema), z.lazy(() => AssignmentWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => AssignmentWhereUniqueInputObjectSchema), z.lazy(() => AssignmentWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => AssignmentUpdateWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => AssignmentUpdateWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => AssignmentUpdateManyWithWhereWithoutUserInputObjectSchema), z.lazy(() => AssignmentUpdateManyWithWhereWithoutUserInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => AssignmentScalarWhereInputObjectSchema), z.lazy(() => AssignmentScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const AssignmentUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.AssignmentUpdateManyWithoutUserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentUpdateManyWithoutUserNestedInput>;
export const AssignmentUpdateManyWithoutUserNestedInputObjectZodSchema = makeSchema();
