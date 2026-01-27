import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OllamaOperationScalarWhereInputObjectSchema as OllamaOperationScalarWhereInputObjectSchema } from './OllamaOperationScalarWhereInput.schema';
import { OllamaOperationUpdateManyMutationInputObjectSchema as OllamaOperationUpdateManyMutationInputObjectSchema } from './OllamaOperationUpdateManyMutationInput.schema';
import { OllamaOperationUncheckedUpdateManyWithoutUserInputObjectSchema as OllamaOperationUncheckedUpdateManyWithoutUserInputObjectSchema } from './OllamaOperationUncheckedUpdateManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OllamaOperationScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => OllamaOperationUpdateManyMutationInputObjectSchema), z.lazy(() => OllamaOperationUncheckedUpdateManyWithoutUserInputObjectSchema)])
}).strict();
export const OllamaOperationUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.OllamaOperationUpdateManyWithWhereWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.OllamaOperationUpdateManyWithWhereWithoutUserInput>;
export const OllamaOperationUpdateManyWithWhereWithoutUserInputObjectZodSchema = makeSchema();
