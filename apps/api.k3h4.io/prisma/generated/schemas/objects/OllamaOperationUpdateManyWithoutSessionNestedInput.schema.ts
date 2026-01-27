import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OllamaOperationCreateWithoutSessionInputObjectSchema as OllamaOperationCreateWithoutSessionInputObjectSchema } from './OllamaOperationCreateWithoutSessionInput.schema';
import { OllamaOperationUncheckedCreateWithoutSessionInputObjectSchema as OllamaOperationUncheckedCreateWithoutSessionInputObjectSchema } from './OllamaOperationUncheckedCreateWithoutSessionInput.schema';
import { OllamaOperationCreateOrConnectWithoutSessionInputObjectSchema as OllamaOperationCreateOrConnectWithoutSessionInputObjectSchema } from './OllamaOperationCreateOrConnectWithoutSessionInput.schema';
import { OllamaOperationUpsertWithWhereUniqueWithoutSessionInputObjectSchema as OllamaOperationUpsertWithWhereUniqueWithoutSessionInputObjectSchema } from './OllamaOperationUpsertWithWhereUniqueWithoutSessionInput.schema';
import { OllamaOperationCreateManySessionInputEnvelopeObjectSchema as OllamaOperationCreateManySessionInputEnvelopeObjectSchema } from './OllamaOperationCreateManySessionInputEnvelope.schema';
import { OllamaOperationWhereUniqueInputObjectSchema as OllamaOperationWhereUniqueInputObjectSchema } from './OllamaOperationWhereUniqueInput.schema';
import { OllamaOperationUpdateWithWhereUniqueWithoutSessionInputObjectSchema as OllamaOperationUpdateWithWhereUniqueWithoutSessionInputObjectSchema } from './OllamaOperationUpdateWithWhereUniqueWithoutSessionInput.schema';
import { OllamaOperationUpdateManyWithWhereWithoutSessionInputObjectSchema as OllamaOperationUpdateManyWithWhereWithoutSessionInputObjectSchema } from './OllamaOperationUpdateManyWithWhereWithoutSessionInput.schema';
import { OllamaOperationScalarWhereInputObjectSchema as OllamaOperationScalarWhereInputObjectSchema } from './OllamaOperationScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => OllamaOperationCreateWithoutSessionInputObjectSchema), z.lazy(() => OllamaOperationCreateWithoutSessionInputObjectSchema).array(), z.lazy(() => OllamaOperationUncheckedCreateWithoutSessionInputObjectSchema), z.lazy(() => OllamaOperationUncheckedCreateWithoutSessionInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => OllamaOperationCreateOrConnectWithoutSessionInputObjectSchema), z.lazy(() => OllamaOperationCreateOrConnectWithoutSessionInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => OllamaOperationUpsertWithWhereUniqueWithoutSessionInputObjectSchema), z.lazy(() => OllamaOperationUpsertWithWhereUniqueWithoutSessionInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => OllamaOperationCreateManySessionInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => OllamaOperationWhereUniqueInputObjectSchema), z.lazy(() => OllamaOperationWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => OllamaOperationWhereUniqueInputObjectSchema), z.lazy(() => OllamaOperationWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => OllamaOperationWhereUniqueInputObjectSchema), z.lazy(() => OllamaOperationWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => OllamaOperationWhereUniqueInputObjectSchema), z.lazy(() => OllamaOperationWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => OllamaOperationUpdateWithWhereUniqueWithoutSessionInputObjectSchema), z.lazy(() => OllamaOperationUpdateWithWhereUniqueWithoutSessionInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => OllamaOperationUpdateManyWithWhereWithoutSessionInputObjectSchema), z.lazy(() => OllamaOperationUpdateManyWithWhereWithoutSessionInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => OllamaOperationScalarWhereInputObjectSchema), z.lazy(() => OllamaOperationScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const OllamaOperationUpdateManyWithoutSessionNestedInputObjectSchema: z.ZodType<Prisma.OllamaOperationUpdateManyWithoutSessionNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.OllamaOperationUpdateManyWithoutSessionNestedInput>;
export const OllamaOperationUpdateManyWithoutSessionNestedInputObjectZodSchema = makeSchema();
