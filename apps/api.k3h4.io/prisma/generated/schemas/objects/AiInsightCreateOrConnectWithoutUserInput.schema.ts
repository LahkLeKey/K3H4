import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AiInsightWhereUniqueInputObjectSchema as AiInsightWhereUniqueInputObjectSchema } from './AiInsightWhereUniqueInput.schema';
import { AiInsightCreateWithoutUserInputObjectSchema as AiInsightCreateWithoutUserInputObjectSchema } from './AiInsightCreateWithoutUserInput.schema';
import { AiInsightUncheckedCreateWithoutUserInputObjectSchema as AiInsightUncheckedCreateWithoutUserInputObjectSchema } from './AiInsightUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AiInsightWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => AiInsightCreateWithoutUserInputObjectSchema), z.lazy(() => AiInsightUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const AiInsightCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.AiInsightCreateOrConnectWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AiInsightCreateOrConnectWithoutUserInput>;
export const AiInsightCreateOrConnectWithoutUserInputObjectZodSchema = makeSchema();
