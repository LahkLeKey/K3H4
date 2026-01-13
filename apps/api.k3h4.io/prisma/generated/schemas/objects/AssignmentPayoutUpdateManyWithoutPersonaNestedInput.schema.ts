import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AssignmentPayoutCreateWithoutPersonaInputObjectSchema as AssignmentPayoutCreateWithoutPersonaInputObjectSchema } from './AssignmentPayoutCreateWithoutPersonaInput.schema';
import { AssignmentPayoutUncheckedCreateWithoutPersonaInputObjectSchema as AssignmentPayoutUncheckedCreateWithoutPersonaInputObjectSchema } from './AssignmentPayoutUncheckedCreateWithoutPersonaInput.schema';
import { AssignmentPayoutCreateOrConnectWithoutPersonaInputObjectSchema as AssignmentPayoutCreateOrConnectWithoutPersonaInputObjectSchema } from './AssignmentPayoutCreateOrConnectWithoutPersonaInput.schema';
import { AssignmentPayoutUpsertWithWhereUniqueWithoutPersonaInputObjectSchema as AssignmentPayoutUpsertWithWhereUniqueWithoutPersonaInputObjectSchema } from './AssignmentPayoutUpsertWithWhereUniqueWithoutPersonaInput.schema';
import { AssignmentPayoutCreateManyPersonaInputEnvelopeObjectSchema as AssignmentPayoutCreateManyPersonaInputEnvelopeObjectSchema } from './AssignmentPayoutCreateManyPersonaInputEnvelope.schema';
import { AssignmentPayoutWhereUniqueInputObjectSchema as AssignmentPayoutWhereUniqueInputObjectSchema } from './AssignmentPayoutWhereUniqueInput.schema';
import { AssignmentPayoutUpdateWithWhereUniqueWithoutPersonaInputObjectSchema as AssignmentPayoutUpdateWithWhereUniqueWithoutPersonaInputObjectSchema } from './AssignmentPayoutUpdateWithWhereUniqueWithoutPersonaInput.schema';
import { AssignmentPayoutUpdateManyWithWhereWithoutPersonaInputObjectSchema as AssignmentPayoutUpdateManyWithWhereWithoutPersonaInputObjectSchema } from './AssignmentPayoutUpdateManyWithWhereWithoutPersonaInput.schema';
import { AssignmentPayoutScalarWhereInputObjectSchema as AssignmentPayoutScalarWhereInputObjectSchema } from './AssignmentPayoutScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AssignmentPayoutCreateWithoutPersonaInputObjectSchema), z.lazy(() => AssignmentPayoutCreateWithoutPersonaInputObjectSchema).array(), z.lazy(() => AssignmentPayoutUncheckedCreateWithoutPersonaInputObjectSchema), z.lazy(() => AssignmentPayoutUncheckedCreateWithoutPersonaInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => AssignmentPayoutCreateOrConnectWithoutPersonaInputObjectSchema), z.lazy(() => AssignmentPayoutCreateOrConnectWithoutPersonaInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => AssignmentPayoutUpsertWithWhereUniqueWithoutPersonaInputObjectSchema), z.lazy(() => AssignmentPayoutUpsertWithWhereUniqueWithoutPersonaInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => AssignmentPayoutCreateManyPersonaInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => AssignmentPayoutWhereUniqueInputObjectSchema), z.lazy(() => AssignmentPayoutWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => AssignmentPayoutWhereUniqueInputObjectSchema), z.lazy(() => AssignmentPayoutWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => AssignmentPayoutWhereUniqueInputObjectSchema), z.lazy(() => AssignmentPayoutWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => AssignmentPayoutWhereUniqueInputObjectSchema), z.lazy(() => AssignmentPayoutWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => AssignmentPayoutUpdateWithWhereUniqueWithoutPersonaInputObjectSchema), z.lazy(() => AssignmentPayoutUpdateWithWhereUniqueWithoutPersonaInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => AssignmentPayoutUpdateManyWithWhereWithoutPersonaInputObjectSchema), z.lazy(() => AssignmentPayoutUpdateManyWithWhereWithoutPersonaInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => AssignmentPayoutScalarWhereInputObjectSchema), z.lazy(() => AssignmentPayoutScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const AssignmentPayoutUpdateManyWithoutPersonaNestedInputObjectSchema: z.ZodType<Prisma.AssignmentPayoutUpdateManyWithoutPersonaNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentPayoutUpdateManyWithoutPersonaNestedInput>;
export const AssignmentPayoutUpdateManyWithoutPersonaNestedInputObjectZodSchema = makeSchema();
