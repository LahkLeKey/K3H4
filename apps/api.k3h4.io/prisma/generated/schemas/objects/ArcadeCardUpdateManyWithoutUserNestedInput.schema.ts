import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeCardCreateWithoutUserInputObjectSchema as ArcadeCardCreateWithoutUserInputObjectSchema } from './ArcadeCardCreateWithoutUserInput.schema';
import { ArcadeCardUncheckedCreateWithoutUserInputObjectSchema as ArcadeCardUncheckedCreateWithoutUserInputObjectSchema } from './ArcadeCardUncheckedCreateWithoutUserInput.schema';
import { ArcadeCardCreateOrConnectWithoutUserInputObjectSchema as ArcadeCardCreateOrConnectWithoutUserInputObjectSchema } from './ArcadeCardCreateOrConnectWithoutUserInput.schema';
import { ArcadeCardUpsertWithWhereUniqueWithoutUserInputObjectSchema as ArcadeCardUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './ArcadeCardUpsertWithWhereUniqueWithoutUserInput.schema';
import { ArcadeCardCreateManyUserInputEnvelopeObjectSchema as ArcadeCardCreateManyUserInputEnvelopeObjectSchema } from './ArcadeCardCreateManyUserInputEnvelope.schema';
import { ArcadeCardWhereUniqueInputObjectSchema as ArcadeCardWhereUniqueInputObjectSchema } from './ArcadeCardWhereUniqueInput.schema';
import { ArcadeCardUpdateWithWhereUniqueWithoutUserInputObjectSchema as ArcadeCardUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './ArcadeCardUpdateWithWhereUniqueWithoutUserInput.schema';
import { ArcadeCardUpdateManyWithWhereWithoutUserInputObjectSchema as ArcadeCardUpdateManyWithWhereWithoutUserInputObjectSchema } from './ArcadeCardUpdateManyWithWhereWithoutUserInput.schema';
import { ArcadeCardScalarWhereInputObjectSchema as ArcadeCardScalarWhereInputObjectSchema } from './ArcadeCardScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ArcadeCardCreateWithoutUserInputObjectSchema), z.lazy(() => ArcadeCardCreateWithoutUserInputObjectSchema).array(), z.lazy(() => ArcadeCardUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => ArcadeCardUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ArcadeCardCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => ArcadeCardCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => ArcadeCardUpsertWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => ArcadeCardUpsertWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ArcadeCardCreateManyUserInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => ArcadeCardWhereUniqueInputObjectSchema), z.lazy(() => ArcadeCardWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => ArcadeCardWhereUniqueInputObjectSchema), z.lazy(() => ArcadeCardWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => ArcadeCardWhereUniqueInputObjectSchema), z.lazy(() => ArcadeCardWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => ArcadeCardWhereUniqueInputObjectSchema), z.lazy(() => ArcadeCardWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => ArcadeCardUpdateWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => ArcadeCardUpdateWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => ArcadeCardUpdateManyWithWhereWithoutUserInputObjectSchema), z.lazy(() => ArcadeCardUpdateManyWithWhereWithoutUserInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => ArcadeCardScalarWhereInputObjectSchema), z.lazy(() => ArcadeCardScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const ArcadeCardUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.ArcadeCardUpdateManyWithoutUserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeCardUpdateManyWithoutUserNestedInput>;
export const ArcadeCardUpdateManyWithoutUserNestedInputObjectZodSchema = makeSchema();
