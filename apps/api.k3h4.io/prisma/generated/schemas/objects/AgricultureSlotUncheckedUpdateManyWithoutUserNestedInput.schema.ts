import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureSlotCreateWithoutUserInputObjectSchema as AgricultureSlotCreateWithoutUserInputObjectSchema } from './AgricultureSlotCreateWithoutUserInput.schema';
import { AgricultureSlotUncheckedCreateWithoutUserInputObjectSchema as AgricultureSlotUncheckedCreateWithoutUserInputObjectSchema } from './AgricultureSlotUncheckedCreateWithoutUserInput.schema';
import { AgricultureSlotCreateOrConnectWithoutUserInputObjectSchema as AgricultureSlotCreateOrConnectWithoutUserInputObjectSchema } from './AgricultureSlotCreateOrConnectWithoutUserInput.schema';
import { AgricultureSlotUpsertWithWhereUniqueWithoutUserInputObjectSchema as AgricultureSlotUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './AgricultureSlotUpsertWithWhereUniqueWithoutUserInput.schema';
import { AgricultureSlotCreateManyUserInputEnvelopeObjectSchema as AgricultureSlotCreateManyUserInputEnvelopeObjectSchema } from './AgricultureSlotCreateManyUserInputEnvelope.schema';
import { AgricultureSlotWhereUniqueInputObjectSchema as AgricultureSlotWhereUniqueInputObjectSchema } from './AgricultureSlotWhereUniqueInput.schema';
import { AgricultureSlotUpdateWithWhereUniqueWithoutUserInputObjectSchema as AgricultureSlotUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './AgricultureSlotUpdateWithWhereUniqueWithoutUserInput.schema';
import { AgricultureSlotUpdateManyWithWhereWithoutUserInputObjectSchema as AgricultureSlotUpdateManyWithWhereWithoutUserInputObjectSchema } from './AgricultureSlotUpdateManyWithWhereWithoutUserInput.schema';
import { AgricultureSlotScalarWhereInputObjectSchema as AgricultureSlotScalarWhereInputObjectSchema } from './AgricultureSlotScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AgricultureSlotCreateWithoutUserInputObjectSchema), z.lazy(() => AgricultureSlotCreateWithoutUserInputObjectSchema).array(), z.lazy(() => AgricultureSlotUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => AgricultureSlotUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => AgricultureSlotCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => AgricultureSlotCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => AgricultureSlotUpsertWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => AgricultureSlotUpsertWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => AgricultureSlotCreateManyUserInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => AgricultureSlotWhereUniqueInputObjectSchema), z.lazy(() => AgricultureSlotWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => AgricultureSlotWhereUniqueInputObjectSchema), z.lazy(() => AgricultureSlotWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => AgricultureSlotWhereUniqueInputObjectSchema), z.lazy(() => AgricultureSlotWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => AgricultureSlotWhereUniqueInputObjectSchema), z.lazy(() => AgricultureSlotWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => AgricultureSlotUpdateWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => AgricultureSlotUpdateWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => AgricultureSlotUpdateManyWithWhereWithoutUserInputObjectSchema), z.lazy(() => AgricultureSlotUpdateManyWithWhereWithoutUserInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => AgricultureSlotScalarWhereInputObjectSchema), z.lazy(() => AgricultureSlotScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const AgricultureSlotUncheckedUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.AgricultureSlotUncheckedUpdateManyWithoutUserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureSlotUncheckedUpdateManyWithoutUserNestedInput>;
export const AgricultureSlotUncheckedUpdateManyWithoutUserNestedInputObjectZodSchema = makeSchema();
