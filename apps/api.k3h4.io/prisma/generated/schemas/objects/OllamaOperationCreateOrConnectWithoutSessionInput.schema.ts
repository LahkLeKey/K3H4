import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OllamaOperationWhereUniqueInputObjectSchema as OllamaOperationWhereUniqueInputObjectSchema } from './OllamaOperationWhereUniqueInput.schema';
import { OllamaOperationCreateWithoutSessionInputObjectSchema as OllamaOperationCreateWithoutSessionInputObjectSchema } from './OllamaOperationCreateWithoutSessionInput.schema';
import { OllamaOperationUncheckedCreateWithoutSessionInputObjectSchema as OllamaOperationUncheckedCreateWithoutSessionInputObjectSchema } from './OllamaOperationUncheckedCreateWithoutSessionInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OllamaOperationWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => OllamaOperationCreateWithoutSessionInputObjectSchema), z.lazy(() => OllamaOperationUncheckedCreateWithoutSessionInputObjectSchema)])
}).strict();
export const OllamaOperationCreateOrConnectWithoutSessionInputObjectSchema: z.ZodType<Prisma.OllamaOperationCreateOrConnectWithoutSessionInput> = makeSchema() as unknown as z.ZodType<Prisma.OllamaOperationCreateOrConnectWithoutSessionInput>;
export const OllamaOperationCreateOrConnectWithoutSessionInputObjectZodSchema = makeSchema();
