import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureInventoryMovementScalarWhereInputObjectSchema as AgricultureInventoryMovementScalarWhereInputObjectSchema } from './AgricultureInventoryMovementScalarWhereInput.schema';
import { AgricultureInventoryMovementUpdateManyMutationInputObjectSchema as AgricultureInventoryMovementUpdateManyMutationInputObjectSchema } from './AgricultureInventoryMovementUpdateManyMutationInput.schema';
import { AgricultureInventoryMovementUncheckedUpdateManyWithoutInventoryInputObjectSchema as AgricultureInventoryMovementUncheckedUpdateManyWithoutInventoryInputObjectSchema } from './AgricultureInventoryMovementUncheckedUpdateManyWithoutInventoryInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgricultureInventoryMovementScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => AgricultureInventoryMovementUpdateManyMutationInputObjectSchema), z.lazy(() => AgricultureInventoryMovementUncheckedUpdateManyWithoutInventoryInputObjectSchema)])
}).strict();
export const AgricultureInventoryMovementUpdateManyWithWhereWithoutInventoryInputObjectSchema: z.ZodType<Prisma.AgricultureInventoryMovementUpdateManyWithWhereWithoutInventoryInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureInventoryMovementUpdateManyWithWhereWithoutInventoryInput>;
export const AgricultureInventoryMovementUpdateManyWithWhereWithoutInventoryInputObjectZodSchema = makeSchema();
