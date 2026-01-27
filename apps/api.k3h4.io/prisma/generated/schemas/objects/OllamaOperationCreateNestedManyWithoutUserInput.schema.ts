import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OllamaOperationCreateWithoutUserInputObjectSchema as OllamaOperationCreateWithoutUserInputObjectSchema } from './OllamaOperationCreateWithoutUserInput.schema';
import { OllamaOperationUncheckedCreateWithoutUserInputObjectSchema as OllamaOperationUncheckedCreateWithoutUserInputObjectSchema } from './OllamaOperationUncheckedCreateWithoutUserInput.schema';
import { OllamaOperationCreateOrConnectWithoutUserInputObjectSchema as OllamaOperationCreateOrConnectWithoutUserInputObjectSchema } from './OllamaOperationCreateOrConnectWithoutUserInput.schema';
import { OllamaOperationCreateManyUserInputEnvelopeObjectSchema as OllamaOperationCreateManyUserInputEnvelopeObjectSchema } from './OllamaOperationCreateManyUserInputEnvelope.schema';
import { OllamaOperationWhereUniqueInputObjectSchema as OllamaOperationWhereUniqueInputObjectSchema } from './OllamaOperationWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => OllamaOperationCreateWithoutUserInputObjectSchema), z.lazy(() => OllamaOperationCreateWithoutUserInputObjectSchema).array(), z.lazy(() => OllamaOperationUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => OllamaOperationUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => OllamaOperationCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => OllamaOperationCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => OllamaOperationCreateManyUserInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => OllamaOperationWhereUniqueInputObjectSchema), z.lazy(() => OllamaOperationWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const OllamaOperationCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.OllamaOperationCreateNestedManyWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.OllamaOperationCreateNestedManyWithoutUserInput>;
export const OllamaOperationCreateNestedManyWithoutUserInputObjectZodSchema = makeSchema();
