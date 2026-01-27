import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AiInsightCreateWithoutUserInputObjectSchema as AiInsightCreateWithoutUserInputObjectSchema } from './AiInsightCreateWithoutUserInput.schema';
import { AiInsightUncheckedCreateWithoutUserInputObjectSchema as AiInsightUncheckedCreateWithoutUserInputObjectSchema } from './AiInsightUncheckedCreateWithoutUserInput.schema';
import { AiInsightCreateOrConnectWithoutUserInputObjectSchema as AiInsightCreateOrConnectWithoutUserInputObjectSchema } from './AiInsightCreateOrConnectWithoutUserInput.schema';
import { AiInsightCreateManyUserInputEnvelopeObjectSchema as AiInsightCreateManyUserInputEnvelopeObjectSchema } from './AiInsightCreateManyUserInputEnvelope.schema';
import { AiInsightWhereUniqueInputObjectSchema as AiInsightWhereUniqueInputObjectSchema } from './AiInsightWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AiInsightCreateWithoutUserInputObjectSchema), z.lazy(() => AiInsightCreateWithoutUserInputObjectSchema).array(), z.lazy(() => AiInsightUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => AiInsightUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => AiInsightCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => AiInsightCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => AiInsightCreateManyUserInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => AiInsightWhereUniqueInputObjectSchema), z.lazy(() => AiInsightWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const AiInsightUncheckedCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.AiInsightUncheckedCreateNestedManyWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AiInsightUncheckedCreateNestedManyWithoutUserInput>;
export const AiInsightUncheckedCreateNestedManyWithoutUserInputObjectZodSchema = makeSchema();
