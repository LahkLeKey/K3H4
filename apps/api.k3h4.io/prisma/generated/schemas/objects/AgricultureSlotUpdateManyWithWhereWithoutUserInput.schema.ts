import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureSlotScalarWhereInputObjectSchema as AgricultureSlotScalarWhereInputObjectSchema } from './AgricultureSlotScalarWhereInput.schema';
import { AgricultureSlotUpdateManyMutationInputObjectSchema as AgricultureSlotUpdateManyMutationInputObjectSchema } from './AgricultureSlotUpdateManyMutationInput.schema';
import { AgricultureSlotUncheckedUpdateManyWithoutUserInputObjectSchema as AgricultureSlotUncheckedUpdateManyWithoutUserInputObjectSchema } from './AgricultureSlotUncheckedUpdateManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgricultureSlotScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => AgricultureSlotUpdateManyMutationInputObjectSchema), z.lazy(() => AgricultureSlotUncheckedUpdateManyWithoutUserInputObjectSchema)])
}).strict();
export const AgricultureSlotUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.AgricultureSlotUpdateManyWithWhereWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureSlotUpdateManyWithWhereWithoutUserInput>;
export const AgricultureSlotUpdateManyWithWhereWithoutUserInputObjectZodSchema = makeSchema();
