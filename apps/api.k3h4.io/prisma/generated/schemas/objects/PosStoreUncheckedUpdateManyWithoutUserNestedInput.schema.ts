import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PosStoreCreateWithoutUserInputObjectSchema as PosStoreCreateWithoutUserInputObjectSchema } from './PosStoreCreateWithoutUserInput.schema';
import { PosStoreUncheckedCreateWithoutUserInputObjectSchema as PosStoreUncheckedCreateWithoutUserInputObjectSchema } from './PosStoreUncheckedCreateWithoutUserInput.schema';
import { PosStoreCreateOrConnectWithoutUserInputObjectSchema as PosStoreCreateOrConnectWithoutUserInputObjectSchema } from './PosStoreCreateOrConnectWithoutUserInput.schema';
import { PosStoreUpsertWithWhereUniqueWithoutUserInputObjectSchema as PosStoreUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './PosStoreUpsertWithWhereUniqueWithoutUserInput.schema';
import { PosStoreCreateManyUserInputEnvelopeObjectSchema as PosStoreCreateManyUserInputEnvelopeObjectSchema } from './PosStoreCreateManyUserInputEnvelope.schema';
import { PosStoreWhereUniqueInputObjectSchema as PosStoreWhereUniqueInputObjectSchema } from './PosStoreWhereUniqueInput.schema';
import { PosStoreUpdateWithWhereUniqueWithoutUserInputObjectSchema as PosStoreUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './PosStoreUpdateWithWhereUniqueWithoutUserInput.schema';
import { PosStoreUpdateManyWithWhereWithoutUserInputObjectSchema as PosStoreUpdateManyWithWhereWithoutUserInputObjectSchema } from './PosStoreUpdateManyWithWhereWithoutUserInput.schema';
import { PosStoreScalarWhereInputObjectSchema as PosStoreScalarWhereInputObjectSchema } from './PosStoreScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PosStoreCreateWithoutUserInputObjectSchema), z.lazy(() => PosStoreCreateWithoutUserInputObjectSchema).array(), z.lazy(() => PosStoreUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => PosStoreUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => PosStoreCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => PosStoreCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => PosStoreUpsertWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => PosStoreUpsertWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => PosStoreCreateManyUserInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => PosStoreWhereUniqueInputObjectSchema), z.lazy(() => PosStoreWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => PosStoreWhereUniqueInputObjectSchema), z.lazy(() => PosStoreWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => PosStoreWhereUniqueInputObjectSchema), z.lazy(() => PosStoreWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => PosStoreWhereUniqueInputObjectSchema), z.lazy(() => PosStoreWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => PosStoreUpdateWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => PosStoreUpdateWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => PosStoreUpdateManyWithWhereWithoutUserInputObjectSchema), z.lazy(() => PosStoreUpdateManyWithWhereWithoutUserInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => PosStoreScalarWhereInputObjectSchema), z.lazy(() => PosStoreScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const PosStoreUncheckedUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.PosStoreUncheckedUpdateManyWithoutUserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.PosStoreUncheckedUpdateManyWithoutUserNestedInput>;
export const PosStoreUncheckedUpdateManyWithoutUserNestedInputObjectZodSchema = makeSchema();
