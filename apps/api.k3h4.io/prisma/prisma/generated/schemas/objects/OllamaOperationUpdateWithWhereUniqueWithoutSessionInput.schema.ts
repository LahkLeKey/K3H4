import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OllamaOperationWhereUniqueInputObjectSchema as OllamaOperationWhereUniqueInputObjectSchema } from './OllamaOperationWhereUniqueInput.schema';
import { OllamaOperationUpdateWithoutSessionInputObjectSchema as OllamaOperationUpdateWithoutSessionInputObjectSchema } from './OllamaOperationUpdateWithoutSessionInput.schema';
import { OllamaOperationUncheckedUpdateWithoutSessionInputObjectSchema as OllamaOperationUncheckedUpdateWithoutSessionInputObjectSchema } from './OllamaOperationUncheckedUpdateWithoutSessionInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OllamaOperationWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => OllamaOperationUpdateWithoutSessionInputObjectSchema), z.lazy(() => OllamaOperationUncheckedUpdateWithoutSessionInputObjectSchema)])
}).strict();
export const OllamaOperationUpdateWithWhereUniqueWithoutSessionInputObjectSchema: z.ZodType<Prisma.OllamaOperationUpdateWithWhereUniqueWithoutSessionInput> = makeSchema() as unknown as z.ZodType<Prisma.OllamaOperationUpdateWithWhereUniqueWithoutSessionInput>;
export const OllamaOperationUpdateWithWhereUniqueWithoutSessionInputObjectZodSchema = makeSchema();
