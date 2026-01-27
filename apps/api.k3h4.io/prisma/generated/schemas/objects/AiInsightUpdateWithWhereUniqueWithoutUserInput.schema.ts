import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AiInsightWhereUniqueInputObjectSchema as AiInsightWhereUniqueInputObjectSchema } from './AiInsightWhereUniqueInput.schema';
import { AiInsightUpdateWithoutUserInputObjectSchema as AiInsightUpdateWithoutUserInputObjectSchema } from './AiInsightUpdateWithoutUserInput.schema';
import { AiInsightUncheckedUpdateWithoutUserInputObjectSchema as AiInsightUncheckedUpdateWithoutUserInputObjectSchema } from './AiInsightUncheckedUpdateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AiInsightWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => AiInsightUpdateWithoutUserInputObjectSchema), z.lazy(() => AiInsightUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const AiInsightUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.AiInsightUpdateWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AiInsightUpdateWithWhereUniqueWithoutUserInput>;
export const AiInsightUpdateWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
