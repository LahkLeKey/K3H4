import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MaptilerQueryCreateWithoutUserInputObjectSchema as MaptilerQueryCreateWithoutUserInputObjectSchema } from './MaptilerQueryCreateWithoutUserInput.schema';
import { MaptilerQueryUncheckedCreateWithoutUserInputObjectSchema as MaptilerQueryUncheckedCreateWithoutUserInputObjectSchema } from './MaptilerQueryUncheckedCreateWithoutUserInput.schema';
import { MaptilerQueryCreateOrConnectWithoutUserInputObjectSchema as MaptilerQueryCreateOrConnectWithoutUserInputObjectSchema } from './MaptilerQueryCreateOrConnectWithoutUserInput.schema';
import { MaptilerQueryUpsertWithWhereUniqueWithoutUserInputObjectSchema as MaptilerQueryUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './MaptilerQueryUpsertWithWhereUniqueWithoutUserInput.schema';
import { MaptilerQueryCreateManyUserInputEnvelopeObjectSchema as MaptilerQueryCreateManyUserInputEnvelopeObjectSchema } from './MaptilerQueryCreateManyUserInputEnvelope.schema';
import { MaptilerQueryWhereUniqueInputObjectSchema as MaptilerQueryWhereUniqueInputObjectSchema } from './MaptilerQueryWhereUniqueInput.schema';
import { MaptilerQueryUpdateWithWhereUniqueWithoutUserInputObjectSchema as MaptilerQueryUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './MaptilerQueryUpdateWithWhereUniqueWithoutUserInput.schema';
import { MaptilerQueryUpdateManyWithWhereWithoutUserInputObjectSchema as MaptilerQueryUpdateManyWithWhereWithoutUserInputObjectSchema } from './MaptilerQueryUpdateManyWithWhereWithoutUserInput.schema';
import { MaptilerQueryScalarWhereInputObjectSchema as MaptilerQueryScalarWhereInputObjectSchema } from './MaptilerQueryScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => MaptilerQueryCreateWithoutUserInputObjectSchema), z.lazy(() => MaptilerQueryCreateWithoutUserInputObjectSchema).array(), z.lazy(() => MaptilerQueryUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => MaptilerQueryUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => MaptilerQueryCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => MaptilerQueryCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => MaptilerQueryUpsertWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => MaptilerQueryUpsertWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => MaptilerQueryCreateManyUserInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => MaptilerQueryWhereUniqueInputObjectSchema), z.lazy(() => MaptilerQueryWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => MaptilerQueryWhereUniqueInputObjectSchema), z.lazy(() => MaptilerQueryWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => MaptilerQueryWhereUniqueInputObjectSchema), z.lazy(() => MaptilerQueryWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => MaptilerQueryWhereUniqueInputObjectSchema), z.lazy(() => MaptilerQueryWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => MaptilerQueryUpdateWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => MaptilerQueryUpdateWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => MaptilerQueryUpdateManyWithWhereWithoutUserInputObjectSchema), z.lazy(() => MaptilerQueryUpdateManyWithWhereWithoutUserInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => MaptilerQueryScalarWhereInputObjectSchema), z.lazy(() => MaptilerQueryScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const MaptilerQueryUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.MaptilerQueryUpdateManyWithoutUserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.MaptilerQueryUpdateManyWithoutUserNestedInput>;
export const MaptilerQueryUpdateManyWithoutUserNestedInputObjectZodSchema = makeSchema();
