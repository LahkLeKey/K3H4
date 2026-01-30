import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OllamaOperationWhereUniqueInputObjectSchema as OllamaOperationWhereUniqueInputObjectSchema } from './OllamaOperationWhereUniqueInput.schema';
import { OllamaOperationUpdateWithoutUserInputObjectSchema as OllamaOperationUpdateWithoutUserInputObjectSchema } from './OllamaOperationUpdateWithoutUserInput.schema';
import { OllamaOperationUncheckedUpdateWithoutUserInputObjectSchema as OllamaOperationUncheckedUpdateWithoutUserInputObjectSchema } from './OllamaOperationUncheckedUpdateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OllamaOperationWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => OllamaOperationUpdateWithoutUserInputObjectSchema), z.lazy(() => OllamaOperationUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const OllamaOperationUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.OllamaOperationUpdateWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.OllamaOperationUpdateWithWhereUniqueWithoutUserInput>;
export const OllamaOperationUpdateWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
