import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AiInsightWhereUniqueInputObjectSchema as AiInsightWhereUniqueInputObjectSchema } from './AiInsightWhereUniqueInput.schema';
import { AiInsightUpdateWithoutUserInputObjectSchema as AiInsightUpdateWithoutUserInputObjectSchema } from './AiInsightUpdateWithoutUserInput.schema';
import { AiInsightUncheckedUpdateWithoutUserInputObjectSchema as AiInsightUncheckedUpdateWithoutUserInputObjectSchema } from './AiInsightUncheckedUpdateWithoutUserInput.schema';
import { AiInsightCreateWithoutUserInputObjectSchema as AiInsightCreateWithoutUserInputObjectSchema } from './AiInsightCreateWithoutUserInput.schema';
import { AiInsightUncheckedCreateWithoutUserInputObjectSchema as AiInsightUncheckedCreateWithoutUserInputObjectSchema } from './AiInsightUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AiInsightWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => AiInsightUpdateWithoutUserInputObjectSchema), z.lazy(() => AiInsightUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => AiInsightCreateWithoutUserInputObjectSchema), z.lazy(() => AiInsightUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const AiInsightUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.AiInsightUpsertWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AiInsightUpsertWithWhereUniqueWithoutUserInput>;
export const AiInsightUpsertWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
