import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OllamaOperationWhereUniqueInputObjectSchema as OllamaOperationWhereUniqueInputObjectSchema } from './OllamaOperationWhereUniqueInput.schema';
import { OllamaOperationUpdateWithoutUserInputObjectSchema as OllamaOperationUpdateWithoutUserInputObjectSchema } from './OllamaOperationUpdateWithoutUserInput.schema';
import { OllamaOperationUncheckedUpdateWithoutUserInputObjectSchema as OllamaOperationUncheckedUpdateWithoutUserInputObjectSchema } from './OllamaOperationUncheckedUpdateWithoutUserInput.schema';
import { OllamaOperationCreateWithoutUserInputObjectSchema as OllamaOperationCreateWithoutUserInputObjectSchema } from './OllamaOperationCreateWithoutUserInput.schema';
import { OllamaOperationUncheckedCreateWithoutUserInputObjectSchema as OllamaOperationUncheckedCreateWithoutUserInputObjectSchema } from './OllamaOperationUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OllamaOperationWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => OllamaOperationUpdateWithoutUserInputObjectSchema), z.lazy(() => OllamaOperationUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => OllamaOperationCreateWithoutUserInputObjectSchema), z.lazy(() => OllamaOperationUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const OllamaOperationUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.OllamaOperationUpsertWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.OllamaOperationUpsertWithWhereUniqueWithoutUserInput>;
export const OllamaOperationUpsertWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
