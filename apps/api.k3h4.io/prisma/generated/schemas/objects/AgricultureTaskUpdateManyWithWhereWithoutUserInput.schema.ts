import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureTaskScalarWhereInputObjectSchema as AgricultureTaskScalarWhereInputObjectSchema } from './AgricultureTaskScalarWhereInput.schema';
import { AgricultureTaskUpdateManyMutationInputObjectSchema as AgricultureTaskUpdateManyMutationInputObjectSchema } from './AgricultureTaskUpdateManyMutationInput.schema';
import { AgricultureTaskUncheckedUpdateManyWithoutUserInputObjectSchema as AgricultureTaskUncheckedUpdateManyWithoutUserInputObjectSchema } from './AgricultureTaskUncheckedUpdateManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgricultureTaskScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => AgricultureTaskUpdateManyMutationInputObjectSchema), z.lazy(() => AgricultureTaskUncheckedUpdateManyWithoutUserInputObjectSchema)])
}).strict();
export const AgricultureTaskUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.AgricultureTaskUpdateManyWithWhereWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureTaskUpdateManyWithWhereWithoutUserInput>;
export const AgricultureTaskUpdateManyWithWhereWithoutUserInputObjectZodSchema = makeSchema();
