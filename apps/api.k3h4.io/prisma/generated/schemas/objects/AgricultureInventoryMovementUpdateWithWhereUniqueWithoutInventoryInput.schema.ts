import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureInventoryMovementWhereUniqueInputObjectSchema as AgricultureInventoryMovementWhereUniqueInputObjectSchema } from './AgricultureInventoryMovementWhereUniqueInput.schema';
import { AgricultureInventoryMovementUpdateWithoutInventoryInputObjectSchema as AgricultureInventoryMovementUpdateWithoutInventoryInputObjectSchema } from './AgricultureInventoryMovementUpdateWithoutInventoryInput.schema';
import { AgricultureInventoryMovementUncheckedUpdateWithoutInventoryInputObjectSchema as AgricultureInventoryMovementUncheckedUpdateWithoutInventoryInputObjectSchema } from './AgricultureInventoryMovementUncheckedUpdateWithoutInventoryInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgricultureInventoryMovementWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => AgricultureInventoryMovementUpdateWithoutInventoryInputObjectSchema), z.lazy(() => AgricultureInventoryMovementUncheckedUpdateWithoutInventoryInputObjectSchema)])
}).strict();
export const AgricultureInventoryMovementUpdateWithWhereUniqueWithoutInventoryInputObjectSchema: z.ZodType<Prisma.AgricultureInventoryMovementUpdateWithWhereUniqueWithoutInventoryInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureInventoryMovementUpdateWithWhereUniqueWithoutInventoryInput>;
export const AgricultureInventoryMovementUpdateWithWhereUniqueWithoutInventoryInputObjectZodSchema = makeSchema();
