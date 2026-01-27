import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OllamaOperationCreateWithoutSessionInputObjectSchema as OllamaOperationCreateWithoutSessionInputObjectSchema } from './OllamaOperationCreateWithoutSessionInput.schema';
import { OllamaOperationUncheckedCreateWithoutSessionInputObjectSchema as OllamaOperationUncheckedCreateWithoutSessionInputObjectSchema } from './OllamaOperationUncheckedCreateWithoutSessionInput.schema';
import { OllamaOperationCreateOrConnectWithoutSessionInputObjectSchema as OllamaOperationCreateOrConnectWithoutSessionInputObjectSchema } from './OllamaOperationCreateOrConnectWithoutSessionInput.schema';
import { OllamaOperationCreateManySessionInputEnvelopeObjectSchema as OllamaOperationCreateManySessionInputEnvelopeObjectSchema } from './OllamaOperationCreateManySessionInputEnvelope.schema';
import { OllamaOperationWhereUniqueInputObjectSchema as OllamaOperationWhereUniqueInputObjectSchema } from './OllamaOperationWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => OllamaOperationCreateWithoutSessionInputObjectSchema), z.lazy(() => OllamaOperationCreateWithoutSessionInputObjectSchema).array(), z.lazy(() => OllamaOperationUncheckedCreateWithoutSessionInputObjectSchema), z.lazy(() => OllamaOperationUncheckedCreateWithoutSessionInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => OllamaOperationCreateOrConnectWithoutSessionInputObjectSchema), z.lazy(() => OllamaOperationCreateOrConnectWithoutSessionInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => OllamaOperationCreateManySessionInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => OllamaOperationWhereUniqueInputObjectSchema), z.lazy(() => OllamaOperationWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const OllamaOperationUncheckedCreateNestedManyWithoutSessionInputObjectSchema: z.ZodType<Prisma.OllamaOperationUncheckedCreateNestedManyWithoutSessionInput> = makeSchema() as unknown as z.ZodType<Prisma.OllamaOperationUncheckedCreateNestedManyWithoutSessionInput>;
export const OllamaOperationUncheckedCreateNestedManyWithoutSessionInputObjectZodSchema = makeSchema();
