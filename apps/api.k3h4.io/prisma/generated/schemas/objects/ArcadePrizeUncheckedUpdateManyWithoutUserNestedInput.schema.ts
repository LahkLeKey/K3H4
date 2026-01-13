import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadePrizeCreateWithoutUserInputObjectSchema as ArcadePrizeCreateWithoutUserInputObjectSchema } from './ArcadePrizeCreateWithoutUserInput.schema';
import { ArcadePrizeUncheckedCreateWithoutUserInputObjectSchema as ArcadePrizeUncheckedCreateWithoutUserInputObjectSchema } from './ArcadePrizeUncheckedCreateWithoutUserInput.schema';
import { ArcadePrizeCreateOrConnectWithoutUserInputObjectSchema as ArcadePrizeCreateOrConnectWithoutUserInputObjectSchema } from './ArcadePrizeCreateOrConnectWithoutUserInput.schema';
import { ArcadePrizeUpsertWithWhereUniqueWithoutUserInputObjectSchema as ArcadePrizeUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './ArcadePrizeUpsertWithWhereUniqueWithoutUserInput.schema';
import { ArcadePrizeCreateManyUserInputEnvelopeObjectSchema as ArcadePrizeCreateManyUserInputEnvelopeObjectSchema } from './ArcadePrizeCreateManyUserInputEnvelope.schema';
import { ArcadePrizeWhereUniqueInputObjectSchema as ArcadePrizeWhereUniqueInputObjectSchema } from './ArcadePrizeWhereUniqueInput.schema';
import { ArcadePrizeUpdateWithWhereUniqueWithoutUserInputObjectSchema as ArcadePrizeUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './ArcadePrizeUpdateWithWhereUniqueWithoutUserInput.schema';
import { ArcadePrizeUpdateManyWithWhereWithoutUserInputObjectSchema as ArcadePrizeUpdateManyWithWhereWithoutUserInputObjectSchema } from './ArcadePrizeUpdateManyWithWhereWithoutUserInput.schema';
import { ArcadePrizeScalarWhereInputObjectSchema as ArcadePrizeScalarWhereInputObjectSchema } from './ArcadePrizeScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ArcadePrizeCreateWithoutUserInputObjectSchema), z.lazy(() => ArcadePrizeCreateWithoutUserInputObjectSchema).array(), z.lazy(() => ArcadePrizeUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => ArcadePrizeUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ArcadePrizeCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => ArcadePrizeCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => ArcadePrizeUpsertWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => ArcadePrizeUpsertWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ArcadePrizeCreateManyUserInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => ArcadePrizeWhereUniqueInputObjectSchema), z.lazy(() => ArcadePrizeWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => ArcadePrizeWhereUniqueInputObjectSchema), z.lazy(() => ArcadePrizeWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => ArcadePrizeWhereUniqueInputObjectSchema), z.lazy(() => ArcadePrizeWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => ArcadePrizeWhereUniqueInputObjectSchema), z.lazy(() => ArcadePrizeWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => ArcadePrizeUpdateWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => ArcadePrizeUpdateWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => ArcadePrizeUpdateManyWithWhereWithoutUserInputObjectSchema), z.lazy(() => ArcadePrizeUpdateManyWithWhereWithoutUserInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => ArcadePrizeScalarWhereInputObjectSchema), z.lazy(() => ArcadePrizeScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const ArcadePrizeUncheckedUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.ArcadePrizeUncheckedUpdateManyWithoutUserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadePrizeUncheckedUpdateManyWithoutUserNestedInput>;
export const ArcadePrizeUncheckedUpdateManyWithoutUserNestedInputObjectZodSchema = makeSchema();
