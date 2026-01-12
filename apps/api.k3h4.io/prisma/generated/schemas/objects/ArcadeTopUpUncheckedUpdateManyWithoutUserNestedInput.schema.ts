import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeTopUpCreateWithoutUserInputObjectSchema as ArcadeTopUpCreateWithoutUserInputObjectSchema } from './ArcadeTopUpCreateWithoutUserInput.schema';
import { ArcadeTopUpUncheckedCreateWithoutUserInputObjectSchema as ArcadeTopUpUncheckedCreateWithoutUserInputObjectSchema } from './ArcadeTopUpUncheckedCreateWithoutUserInput.schema';
import { ArcadeTopUpCreateOrConnectWithoutUserInputObjectSchema as ArcadeTopUpCreateOrConnectWithoutUserInputObjectSchema } from './ArcadeTopUpCreateOrConnectWithoutUserInput.schema';
import { ArcadeTopUpUpsertWithWhereUniqueWithoutUserInputObjectSchema as ArcadeTopUpUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './ArcadeTopUpUpsertWithWhereUniqueWithoutUserInput.schema';
import { ArcadeTopUpCreateManyUserInputEnvelopeObjectSchema as ArcadeTopUpCreateManyUserInputEnvelopeObjectSchema } from './ArcadeTopUpCreateManyUserInputEnvelope.schema';
import { ArcadeTopUpWhereUniqueInputObjectSchema as ArcadeTopUpWhereUniqueInputObjectSchema } from './ArcadeTopUpWhereUniqueInput.schema';
import { ArcadeTopUpUpdateWithWhereUniqueWithoutUserInputObjectSchema as ArcadeTopUpUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './ArcadeTopUpUpdateWithWhereUniqueWithoutUserInput.schema';
import { ArcadeTopUpUpdateManyWithWhereWithoutUserInputObjectSchema as ArcadeTopUpUpdateManyWithWhereWithoutUserInputObjectSchema } from './ArcadeTopUpUpdateManyWithWhereWithoutUserInput.schema';
import { ArcadeTopUpScalarWhereInputObjectSchema as ArcadeTopUpScalarWhereInputObjectSchema } from './ArcadeTopUpScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ArcadeTopUpCreateWithoutUserInputObjectSchema), z.lazy(() => ArcadeTopUpCreateWithoutUserInputObjectSchema).array(), z.lazy(() => ArcadeTopUpUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => ArcadeTopUpUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ArcadeTopUpCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => ArcadeTopUpCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => ArcadeTopUpUpsertWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => ArcadeTopUpUpsertWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ArcadeTopUpCreateManyUserInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => ArcadeTopUpWhereUniqueInputObjectSchema), z.lazy(() => ArcadeTopUpWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => ArcadeTopUpWhereUniqueInputObjectSchema), z.lazy(() => ArcadeTopUpWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => ArcadeTopUpWhereUniqueInputObjectSchema), z.lazy(() => ArcadeTopUpWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => ArcadeTopUpWhereUniqueInputObjectSchema), z.lazy(() => ArcadeTopUpWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => ArcadeTopUpUpdateWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => ArcadeTopUpUpdateWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => ArcadeTopUpUpdateManyWithWhereWithoutUserInputObjectSchema), z.lazy(() => ArcadeTopUpUpdateManyWithWhereWithoutUserInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => ArcadeTopUpScalarWhereInputObjectSchema), z.lazy(() => ArcadeTopUpScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const ArcadeTopUpUncheckedUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.ArcadeTopUpUncheckedUpdateManyWithoutUserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeTopUpUncheckedUpdateManyWithoutUserNestedInput>;
export const ArcadeTopUpUncheckedUpdateManyWithoutUserNestedInputObjectZodSchema = makeSchema();
