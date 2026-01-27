import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AiInsightScalarWhereInputObjectSchema as AiInsightScalarWhereInputObjectSchema } from './AiInsightScalarWhereInput.schema';
import { AiInsightUpdateManyMutationInputObjectSchema as AiInsightUpdateManyMutationInputObjectSchema } from './AiInsightUpdateManyMutationInput.schema';
import { AiInsightUncheckedUpdateManyWithoutUserInputObjectSchema as AiInsightUncheckedUpdateManyWithoutUserInputObjectSchema } from './AiInsightUncheckedUpdateManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AiInsightScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => AiInsightUpdateManyMutationInputObjectSchema), z.lazy(() => AiInsightUncheckedUpdateManyWithoutUserInputObjectSchema)])
}).strict();
export const AiInsightUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.AiInsightUpdateManyWithWhereWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AiInsightUpdateManyWithWhereWithoutUserInput>;
export const AiInsightUpdateManyWithWhereWithoutUserInputObjectZodSchema = makeSchema();
