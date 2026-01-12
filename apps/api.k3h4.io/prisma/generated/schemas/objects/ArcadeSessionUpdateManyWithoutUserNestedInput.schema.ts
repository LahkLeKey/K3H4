import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeSessionCreateWithoutUserInputObjectSchema as ArcadeSessionCreateWithoutUserInputObjectSchema } from './ArcadeSessionCreateWithoutUserInput.schema';
import { ArcadeSessionUncheckedCreateWithoutUserInputObjectSchema as ArcadeSessionUncheckedCreateWithoutUserInputObjectSchema } from './ArcadeSessionUncheckedCreateWithoutUserInput.schema';
import { ArcadeSessionCreateOrConnectWithoutUserInputObjectSchema as ArcadeSessionCreateOrConnectWithoutUserInputObjectSchema } from './ArcadeSessionCreateOrConnectWithoutUserInput.schema';
import { ArcadeSessionUpsertWithWhereUniqueWithoutUserInputObjectSchema as ArcadeSessionUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './ArcadeSessionUpsertWithWhereUniqueWithoutUserInput.schema';
import { ArcadeSessionCreateManyUserInputEnvelopeObjectSchema as ArcadeSessionCreateManyUserInputEnvelopeObjectSchema } from './ArcadeSessionCreateManyUserInputEnvelope.schema';
import { ArcadeSessionWhereUniqueInputObjectSchema as ArcadeSessionWhereUniqueInputObjectSchema } from './ArcadeSessionWhereUniqueInput.schema';
import { ArcadeSessionUpdateWithWhereUniqueWithoutUserInputObjectSchema as ArcadeSessionUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './ArcadeSessionUpdateWithWhereUniqueWithoutUserInput.schema';
import { ArcadeSessionUpdateManyWithWhereWithoutUserInputObjectSchema as ArcadeSessionUpdateManyWithWhereWithoutUserInputObjectSchema } from './ArcadeSessionUpdateManyWithWhereWithoutUserInput.schema';
import { ArcadeSessionScalarWhereInputObjectSchema as ArcadeSessionScalarWhereInputObjectSchema } from './ArcadeSessionScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ArcadeSessionCreateWithoutUserInputObjectSchema), z.lazy(() => ArcadeSessionCreateWithoutUserInputObjectSchema).array(), z.lazy(() => ArcadeSessionUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => ArcadeSessionUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ArcadeSessionCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => ArcadeSessionCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => ArcadeSessionUpsertWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => ArcadeSessionUpsertWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ArcadeSessionCreateManyUserInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => ArcadeSessionWhereUniqueInputObjectSchema), z.lazy(() => ArcadeSessionWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => ArcadeSessionWhereUniqueInputObjectSchema), z.lazy(() => ArcadeSessionWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => ArcadeSessionWhereUniqueInputObjectSchema), z.lazy(() => ArcadeSessionWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => ArcadeSessionWhereUniqueInputObjectSchema), z.lazy(() => ArcadeSessionWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => ArcadeSessionUpdateWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => ArcadeSessionUpdateWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => ArcadeSessionUpdateManyWithWhereWithoutUserInputObjectSchema), z.lazy(() => ArcadeSessionUpdateManyWithWhereWithoutUserInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => ArcadeSessionScalarWhereInputObjectSchema), z.lazy(() => ArcadeSessionScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const ArcadeSessionUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.ArcadeSessionUpdateManyWithoutUserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeSessionUpdateManyWithoutUserNestedInput>;
export const ArcadeSessionUpdateManyWithoutUserNestedInputObjectZodSchema = makeSchema();
