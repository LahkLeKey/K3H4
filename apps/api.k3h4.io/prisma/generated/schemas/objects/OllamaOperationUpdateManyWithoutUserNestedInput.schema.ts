import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OllamaOperationCreateWithoutUserInputObjectSchema as OllamaOperationCreateWithoutUserInputObjectSchema } from './OllamaOperationCreateWithoutUserInput.schema';
import { OllamaOperationUncheckedCreateWithoutUserInputObjectSchema as OllamaOperationUncheckedCreateWithoutUserInputObjectSchema } from './OllamaOperationUncheckedCreateWithoutUserInput.schema';
import { OllamaOperationCreateOrConnectWithoutUserInputObjectSchema as OllamaOperationCreateOrConnectWithoutUserInputObjectSchema } from './OllamaOperationCreateOrConnectWithoutUserInput.schema';
import { OllamaOperationUpsertWithWhereUniqueWithoutUserInputObjectSchema as OllamaOperationUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './OllamaOperationUpsertWithWhereUniqueWithoutUserInput.schema';
import { OllamaOperationCreateManyUserInputEnvelopeObjectSchema as OllamaOperationCreateManyUserInputEnvelopeObjectSchema } from './OllamaOperationCreateManyUserInputEnvelope.schema';
import { OllamaOperationWhereUniqueInputObjectSchema as OllamaOperationWhereUniqueInputObjectSchema } from './OllamaOperationWhereUniqueInput.schema';
import { OllamaOperationUpdateWithWhereUniqueWithoutUserInputObjectSchema as OllamaOperationUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './OllamaOperationUpdateWithWhereUniqueWithoutUserInput.schema';
import { OllamaOperationUpdateManyWithWhereWithoutUserInputObjectSchema as OllamaOperationUpdateManyWithWhereWithoutUserInputObjectSchema } from './OllamaOperationUpdateManyWithWhereWithoutUserInput.schema';
import { OllamaOperationScalarWhereInputObjectSchema as OllamaOperationScalarWhereInputObjectSchema } from './OllamaOperationScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => OllamaOperationCreateWithoutUserInputObjectSchema), z.lazy(() => OllamaOperationCreateWithoutUserInputObjectSchema).array(), z.lazy(() => OllamaOperationUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => OllamaOperationUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => OllamaOperationCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => OllamaOperationCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => OllamaOperationUpsertWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => OllamaOperationUpsertWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => OllamaOperationCreateManyUserInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => OllamaOperationWhereUniqueInputObjectSchema), z.lazy(() => OllamaOperationWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => OllamaOperationWhereUniqueInputObjectSchema), z.lazy(() => OllamaOperationWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => OllamaOperationWhereUniqueInputObjectSchema), z.lazy(() => OllamaOperationWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => OllamaOperationWhereUniqueInputObjectSchema), z.lazy(() => OllamaOperationWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => OllamaOperationUpdateWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => OllamaOperationUpdateWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => OllamaOperationUpdateManyWithWhereWithoutUserInputObjectSchema), z.lazy(() => OllamaOperationUpdateManyWithWhereWithoutUserInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => OllamaOperationScalarWhereInputObjectSchema), z.lazy(() => OllamaOperationScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const OllamaOperationUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.OllamaOperationUpdateManyWithoutUserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.OllamaOperationUpdateManyWithoutUserNestedInput>;
export const OllamaOperationUpdateManyWithoutUserNestedInputObjectZodSchema = makeSchema();
