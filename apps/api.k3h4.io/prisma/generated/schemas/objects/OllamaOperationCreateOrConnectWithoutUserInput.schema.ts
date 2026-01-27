import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OllamaOperationWhereUniqueInputObjectSchema as OllamaOperationWhereUniqueInputObjectSchema } from './OllamaOperationWhereUniqueInput.schema';
import { OllamaOperationCreateWithoutUserInputObjectSchema as OllamaOperationCreateWithoutUserInputObjectSchema } from './OllamaOperationCreateWithoutUserInput.schema';
import { OllamaOperationUncheckedCreateWithoutUserInputObjectSchema as OllamaOperationUncheckedCreateWithoutUserInputObjectSchema } from './OllamaOperationUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OllamaOperationWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => OllamaOperationCreateWithoutUserInputObjectSchema), z.lazy(() => OllamaOperationUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const OllamaOperationCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.OllamaOperationCreateOrConnectWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.OllamaOperationCreateOrConnectWithoutUserInput>;
export const OllamaOperationCreateOrConnectWithoutUserInputObjectZodSchema = makeSchema();
