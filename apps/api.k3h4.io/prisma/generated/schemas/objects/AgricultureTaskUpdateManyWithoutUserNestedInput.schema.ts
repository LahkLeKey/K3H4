import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureTaskCreateWithoutUserInputObjectSchema as AgricultureTaskCreateWithoutUserInputObjectSchema } from './AgricultureTaskCreateWithoutUserInput.schema';
import { AgricultureTaskUncheckedCreateWithoutUserInputObjectSchema as AgricultureTaskUncheckedCreateWithoutUserInputObjectSchema } from './AgricultureTaskUncheckedCreateWithoutUserInput.schema';
import { AgricultureTaskCreateOrConnectWithoutUserInputObjectSchema as AgricultureTaskCreateOrConnectWithoutUserInputObjectSchema } from './AgricultureTaskCreateOrConnectWithoutUserInput.schema';
import { AgricultureTaskUpsertWithWhereUniqueWithoutUserInputObjectSchema as AgricultureTaskUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './AgricultureTaskUpsertWithWhereUniqueWithoutUserInput.schema';
import { AgricultureTaskCreateManyUserInputEnvelopeObjectSchema as AgricultureTaskCreateManyUserInputEnvelopeObjectSchema } from './AgricultureTaskCreateManyUserInputEnvelope.schema';
import { AgricultureTaskWhereUniqueInputObjectSchema as AgricultureTaskWhereUniqueInputObjectSchema } from './AgricultureTaskWhereUniqueInput.schema';
import { AgricultureTaskUpdateWithWhereUniqueWithoutUserInputObjectSchema as AgricultureTaskUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './AgricultureTaskUpdateWithWhereUniqueWithoutUserInput.schema';
import { AgricultureTaskUpdateManyWithWhereWithoutUserInputObjectSchema as AgricultureTaskUpdateManyWithWhereWithoutUserInputObjectSchema } from './AgricultureTaskUpdateManyWithWhereWithoutUserInput.schema';
import { AgricultureTaskScalarWhereInputObjectSchema as AgricultureTaskScalarWhereInputObjectSchema } from './AgricultureTaskScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AgricultureTaskCreateWithoutUserInputObjectSchema), z.lazy(() => AgricultureTaskCreateWithoutUserInputObjectSchema).array(), z.lazy(() => AgricultureTaskUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => AgricultureTaskUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => AgricultureTaskCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => AgricultureTaskCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => AgricultureTaskUpsertWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => AgricultureTaskUpsertWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => AgricultureTaskCreateManyUserInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => AgricultureTaskWhereUniqueInputObjectSchema), z.lazy(() => AgricultureTaskWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => AgricultureTaskWhereUniqueInputObjectSchema), z.lazy(() => AgricultureTaskWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => AgricultureTaskWhereUniqueInputObjectSchema), z.lazy(() => AgricultureTaskWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => AgricultureTaskWhereUniqueInputObjectSchema), z.lazy(() => AgricultureTaskWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => AgricultureTaskUpdateWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => AgricultureTaskUpdateWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => AgricultureTaskUpdateManyWithWhereWithoutUserInputObjectSchema), z.lazy(() => AgricultureTaskUpdateManyWithWhereWithoutUserInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => AgricultureTaskScalarWhereInputObjectSchema), z.lazy(() => AgricultureTaskScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const AgricultureTaskUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.AgricultureTaskUpdateManyWithoutUserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureTaskUpdateManyWithoutUserNestedInput>;
export const AgricultureTaskUpdateManyWithoutUserNestedInputObjectZodSchema = makeSchema();
