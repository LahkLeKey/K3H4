import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AiInsightCreateWithoutUserInputObjectSchema as AiInsightCreateWithoutUserInputObjectSchema } from './AiInsightCreateWithoutUserInput.schema';
import { AiInsightUncheckedCreateWithoutUserInputObjectSchema as AiInsightUncheckedCreateWithoutUserInputObjectSchema } from './AiInsightUncheckedCreateWithoutUserInput.schema';
import { AiInsightCreateOrConnectWithoutUserInputObjectSchema as AiInsightCreateOrConnectWithoutUserInputObjectSchema } from './AiInsightCreateOrConnectWithoutUserInput.schema';
import { AiInsightUpsertWithWhereUniqueWithoutUserInputObjectSchema as AiInsightUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './AiInsightUpsertWithWhereUniqueWithoutUserInput.schema';
import { AiInsightCreateManyUserInputEnvelopeObjectSchema as AiInsightCreateManyUserInputEnvelopeObjectSchema } from './AiInsightCreateManyUserInputEnvelope.schema';
import { AiInsightWhereUniqueInputObjectSchema as AiInsightWhereUniqueInputObjectSchema } from './AiInsightWhereUniqueInput.schema';
import { AiInsightUpdateWithWhereUniqueWithoutUserInputObjectSchema as AiInsightUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './AiInsightUpdateWithWhereUniqueWithoutUserInput.schema';
import { AiInsightUpdateManyWithWhereWithoutUserInputObjectSchema as AiInsightUpdateManyWithWhereWithoutUserInputObjectSchema } from './AiInsightUpdateManyWithWhereWithoutUserInput.schema';
import { AiInsightScalarWhereInputObjectSchema as AiInsightScalarWhereInputObjectSchema } from './AiInsightScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AiInsightCreateWithoutUserInputObjectSchema), z.lazy(() => AiInsightCreateWithoutUserInputObjectSchema).array(), z.lazy(() => AiInsightUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => AiInsightUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => AiInsightCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => AiInsightCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => AiInsightUpsertWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => AiInsightUpsertWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => AiInsightCreateManyUserInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => AiInsightWhereUniqueInputObjectSchema), z.lazy(() => AiInsightWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => AiInsightWhereUniqueInputObjectSchema), z.lazy(() => AiInsightWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => AiInsightWhereUniqueInputObjectSchema), z.lazy(() => AiInsightWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => AiInsightWhereUniqueInputObjectSchema), z.lazy(() => AiInsightWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => AiInsightUpdateWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => AiInsightUpdateWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => AiInsightUpdateManyWithWhereWithoutUserInputObjectSchema), z.lazy(() => AiInsightUpdateManyWithWhereWithoutUserInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => AiInsightScalarWhereInputObjectSchema), z.lazy(() => AiInsightScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const AiInsightUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.AiInsightUpdateManyWithoutUserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.AiInsightUpdateManyWithoutUserNestedInput>;
export const AiInsightUpdateManyWithoutUserNestedInputObjectZodSchema = makeSchema();
