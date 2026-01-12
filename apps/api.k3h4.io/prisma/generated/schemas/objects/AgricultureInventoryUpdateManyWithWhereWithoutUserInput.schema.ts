import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureInventoryScalarWhereInputObjectSchema as AgricultureInventoryScalarWhereInputObjectSchema } from './AgricultureInventoryScalarWhereInput.schema';
import { AgricultureInventoryUpdateManyMutationInputObjectSchema as AgricultureInventoryUpdateManyMutationInputObjectSchema } from './AgricultureInventoryUpdateManyMutationInput.schema';
import { AgricultureInventoryUncheckedUpdateManyWithoutUserInputObjectSchema as AgricultureInventoryUncheckedUpdateManyWithoutUserInputObjectSchema } from './AgricultureInventoryUncheckedUpdateManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgricultureInventoryScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => AgricultureInventoryUpdateManyMutationInputObjectSchema), z.lazy(() => AgricultureInventoryUncheckedUpdateManyWithoutUserInputObjectSchema)])
}).strict();
export const AgricultureInventoryUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.AgricultureInventoryUpdateManyWithWhereWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureInventoryUpdateManyWithWhereWithoutUserInput>;
export const AgricultureInventoryUpdateManyWithWhereWithoutUserInputObjectZodSchema = makeSchema();
