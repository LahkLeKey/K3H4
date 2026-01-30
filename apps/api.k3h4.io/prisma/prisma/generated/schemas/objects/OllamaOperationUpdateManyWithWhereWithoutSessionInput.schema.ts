import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OllamaOperationScalarWhereInputObjectSchema as OllamaOperationScalarWhereInputObjectSchema } from './OllamaOperationScalarWhereInput.schema';
import { OllamaOperationUpdateManyMutationInputObjectSchema as OllamaOperationUpdateManyMutationInputObjectSchema } from './OllamaOperationUpdateManyMutationInput.schema';
import { OllamaOperationUncheckedUpdateManyWithoutSessionInputObjectSchema as OllamaOperationUncheckedUpdateManyWithoutSessionInputObjectSchema } from './OllamaOperationUncheckedUpdateManyWithoutSessionInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OllamaOperationScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => OllamaOperationUpdateManyMutationInputObjectSchema), z.lazy(() => OllamaOperationUncheckedUpdateManyWithoutSessionInputObjectSchema)])
}).strict();
export const OllamaOperationUpdateManyWithWhereWithoutSessionInputObjectSchema: z.ZodType<Prisma.OllamaOperationUpdateManyWithWhereWithoutSessionInput> = makeSchema() as unknown as z.ZodType<Prisma.OllamaOperationUpdateManyWithWhereWithoutSessionInput>;
export const OllamaOperationUpdateManyWithWhereWithoutSessionInputObjectZodSchema = makeSchema();
