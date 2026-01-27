import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OllamaOperationWhereUniqueInputObjectSchema as OllamaOperationWhereUniqueInputObjectSchema } from './OllamaOperationWhereUniqueInput.schema';
import { OllamaOperationUpdateWithoutSessionInputObjectSchema as OllamaOperationUpdateWithoutSessionInputObjectSchema } from './OllamaOperationUpdateWithoutSessionInput.schema';
import { OllamaOperationUncheckedUpdateWithoutSessionInputObjectSchema as OllamaOperationUncheckedUpdateWithoutSessionInputObjectSchema } from './OllamaOperationUncheckedUpdateWithoutSessionInput.schema';
import { OllamaOperationCreateWithoutSessionInputObjectSchema as OllamaOperationCreateWithoutSessionInputObjectSchema } from './OllamaOperationCreateWithoutSessionInput.schema';
import { OllamaOperationUncheckedCreateWithoutSessionInputObjectSchema as OllamaOperationUncheckedCreateWithoutSessionInputObjectSchema } from './OllamaOperationUncheckedCreateWithoutSessionInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OllamaOperationWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => OllamaOperationUpdateWithoutSessionInputObjectSchema), z.lazy(() => OllamaOperationUncheckedUpdateWithoutSessionInputObjectSchema)]),
  create: z.union([z.lazy(() => OllamaOperationCreateWithoutSessionInputObjectSchema), z.lazy(() => OllamaOperationUncheckedCreateWithoutSessionInputObjectSchema)])
}).strict();
export const OllamaOperationUpsertWithWhereUniqueWithoutSessionInputObjectSchema: z.ZodType<Prisma.OllamaOperationUpsertWithWhereUniqueWithoutSessionInput> = makeSchema() as unknown as z.ZodType<Prisma.OllamaOperationUpsertWithWhereUniqueWithoutSessionInput>;
export const OllamaOperationUpsertWithWhereUniqueWithoutSessionInputObjectZodSchema = makeSchema();
