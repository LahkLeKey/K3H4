import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ActorCreateWithoutUserInputObjectSchema as ActorCreateWithoutUserInputObjectSchema } from './ActorCreateWithoutUserInput.schema';
import { ActorUncheckedCreateWithoutUserInputObjectSchema as ActorUncheckedCreateWithoutUserInputObjectSchema } from './ActorUncheckedCreateWithoutUserInput.schema';
import { ActorCreateOrConnectWithoutUserInputObjectSchema as ActorCreateOrConnectWithoutUserInputObjectSchema } from './ActorCreateOrConnectWithoutUserInput.schema';
import { ActorUpsertWithWhereUniqueWithoutUserInputObjectSchema as ActorUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './ActorUpsertWithWhereUniqueWithoutUserInput.schema';
import { ActorCreateManyUserInputEnvelopeObjectSchema as ActorCreateManyUserInputEnvelopeObjectSchema } from './ActorCreateManyUserInputEnvelope.schema';
import { ActorWhereUniqueInputObjectSchema as ActorWhereUniqueInputObjectSchema } from './ActorWhereUniqueInput.schema';
import { ActorUpdateWithWhereUniqueWithoutUserInputObjectSchema as ActorUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './ActorUpdateWithWhereUniqueWithoutUserInput.schema';
import { ActorUpdateManyWithWhereWithoutUserInputObjectSchema as ActorUpdateManyWithWhereWithoutUserInputObjectSchema } from './ActorUpdateManyWithWhereWithoutUserInput.schema';
import { ActorScalarWhereInputObjectSchema as ActorScalarWhereInputObjectSchema } from './ActorScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ActorCreateWithoutUserInputObjectSchema), z.lazy(() => ActorCreateWithoutUserInputObjectSchema).array(), z.lazy(() => ActorUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => ActorUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ActorCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => ActorCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => ActorUpsertWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => ActorUpsertWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ActorCreateManyUserInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => ActorWhereUniqueInputObjectSchema), z.lazy(() => ActorWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => ActorWhereUniqueInputObjectSchema), z.lazy(() => ActorWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => ActorWhereUniqueInputObjectSchema), z.lazy(() => ActorWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => ActorWhereUniqueInputObjectSchema), z.lazy(() => ActorWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => ActorUpdateWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => ActorUpdateWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => ActorUpdateManyWithWhereWithoutUserInputObjectSchema), z.lazy(() => ActorUpdateManyWithWhereWithoutUserInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => ActorScalarWhereInputObjectSchema), z.lazy(() => ActorScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const ActorUncheckedUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.ActorUncheckedUpdateManyWithoutUserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ActorUncheckedUpdateManyWithoutUserNestedInput>;
export const ActorUncheckedUpdateManyWithoutUserNestedInputObjectZodSchema = makeSchema();
