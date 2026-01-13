import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AssignmentCreateWithoutPersonaInputObjectSchema as AssignmentCreateWithoutPersonaInputObjectSchema } from './AssignmentCreateWithoutPersonaInput.schema';
import { AssignmentUncheckedCreateWithoutPersonaInputObjectSchema as AssignmentUncheckedCreateWithoutPersonaInputObjectSchema } from './AssignmentUncheckedCreateWithoutPersonaInput.schema';
import { AssignmentCreateOrConnectWithoutPersonaInputObjectSchema as AssignmentCreateOrConnectWithoutPersonaInputObjectSchema } from './AssignmentCreateOrConnectWithoutPersonaInput.schema';
import { AssignmentUpsertWithWhereUniqueWithoutPersonaInputObjectSchema as AssignmentUpsertWithWhereUniqueWithoutPersonaInputObjectSchema } from './AssignmentUpsertWithWhereUniqueWithoutPersonaInput.schema';
import { AssignmentCreateManyPersonaInputEnvelopeObjectSchema as AssignmentCreateManyPersonaInputEnvelopeObjectSchema } from './AssignmentCreateManyPersonaInputEnvelope.schema';
import { AssignmentWhereUniqueInputObjectSchema as AssignmentWhereUniqueInputObjectSchema } from './AssignmentWhereUniqueInput.schema';
import { AssignmentUpdateWithWhereUniqueWithoutPersonaInputObjectSchema as AssignmentUpdateWithWhereUniqueWithoutPersonaInputObjectSchema } from './AssignmentUpdateWithWhereUniqueWithoutPersonaInput.schema';
import { AssignmentUpdateManyWithWhereWithoutPersonaInputObjectSchema as AssignmentUpdateManyWithWhereWithoutPersonaInputObjectSchema } from './AssignmentUpdateManyWithWhereWithoutPersonaInput.schema';
import { AssignmentScalarWhereInputObjectSchema as AssignmentScalarWhereInputObjectSchema } from './AssignmentScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AssignmentCreateWithoutPersonaInputObjectSchema), z.lazy(() => AssignmentCreateWithoutPersonaInputObjectSchema).array(), z.lazy(() => AssignmentUncheckedCreateWithoutPersonaInputObjectSchema), z.lazy(() => AssignmentUncheckedCreateWithoutPersonaInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => AssignmentCreateOrConnectWithoutPersonaInputObjectSchema), z.lazy(() => AssignmentCreateOrConnectWithoutPersonaInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => AssignmentUpsertWithWhereUniqueWithoutPersonaInputObjectSchema), z.lazy(() => AssignmentUpsertWithWhereUniqueWithoutPersonaInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => AssignmentCreateManyPersonaInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => AssignmentWhereUniqueInputObjectSchema), z.lazy(() => AssignmentWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => AssignmentWhereUniqueInputObjectSchema), z.lazy(() => AssignmentWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => AssignmentWhereUniqueInputObjectSchema), z.lazy(() => AssignmentWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => AssignmentWhereUniqueInputObjectSchema), z.lazy(() => AssignmentWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => AssignmentUpdateWithWhereUniqueWithoutPersonaInputObjectSchema), z.lazy(() => AssignmentUpdateWithWhereUniqueWithoutPersonaInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => AssignmentUpdateManyWithWhereWithoutPersonaInputObjectSchema), z.lazy(() => AssignmentUpdateManyWithWhereWithoutPersonaInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => AssignmentScalarWhereInputObjectSchema), z.lazy(() => AssignmentScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const AssignmentUncheckedUpdateManyWithoutPersonaNestedInputObjectSchema: z.ZodType<Prisma.AssignmentUncheckedUpdateManyWithoutPersonaNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentUncheckedUpdateManyWithoutPersonaNestedInput>;
export const AssignmentUncheckedUpdateManyWithoutPersonaNestedInputObjectZodSchema = makeSchema();
