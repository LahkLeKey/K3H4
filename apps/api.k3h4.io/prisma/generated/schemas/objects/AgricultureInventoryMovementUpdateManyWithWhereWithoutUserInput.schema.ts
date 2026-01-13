import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureInventoryMovementScalarWhereInputObjectSchema as AgricultureInventoryMovementScalarWhereInputObjectSchema } from './AgricultureInventoryMovementScalarWhereInput.schema';
import { AgricultureInventoryMovementUpdateManyMutationInputObjectSchema as AgricultureInventoryMovementUpdateManyMutationInputObjectSchema } from './AgricultureInventoryMovementUpdateManyMutationInput.schema';
import { AgricultureInventoryMovementUncheckedUpdateManyWithoutUserInputObjectSchema as AgricultureInventoryMovementUncheckedUpdateManyWithoutUserInputObjectSchema } from './AgricultureInventoryMovementUncheckedUpdateManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgricultureInventoryMovementScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => AgricultureInventoryMovementUpdateManyMutationInputObjectSchema), z.lazy(() => AgricultureInventoryMovementUncheckedUpdateManyWithoutUserInputObjectSchema)])
}).strict();
export const AgricultureInventoryMovementUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.AgricultureInventoryMovementUpdateManyWithWhereWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureInventoryMovementUpdateManyWithWhereWithoutUserInput>;
export const AgricultureInventoryMovementUpdateManyWithWhereWithoutUserInputObjectZodSchema = makeSchema();
