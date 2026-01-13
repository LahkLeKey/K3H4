import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureInventoryMovementWhereUniqueInputObjectSchema as AgricultureInventoryMovementWhereUniqueInputObjectSchema } from './AgricultureInventoryMovementWhereUniqueInput.schema';
import { AgricultureInventoryMovementUpdateWithoutInventoryInputObjectSchema as AgricultureInventoryMovementUpdateWithoutInventoryInputObjectSchema } from './AgricultureInventoryMovementUpdateWithoutInventoryInput.schema';
import { AgricultureInventoryMovementUncheckedUpdateWithoutInventoryInputObjectSchema as AgricultureInventoryMovementUncheckedUpdateWithoutInventoryInputObjectSchema } from './AgricultureInventoryMovementUncheckedUpdateWithoutInventoryInput.schema';
import { AgricultureInventoryMovementCreateWithoutInventoryInputObjectSchema as AgricultureInventoryMovementCreateWithoutInventoryInputObjectSchema } from './AgricultureInventoryMovementCreateWithoutInventoryInput.schema';
import { AgricultureInventoryMovementUncheckedCreateWithoutInventoryInputObjectSchema as AgricultureInventoryMovementUncheckedCreateWithoutInventoryInputObjectSchema } from './AgricultureInventoryMovementUncheckedCreateWithoutInventoryInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgricultureInventoryMovementWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => AgricultureInventoryMovementUpdateWithoutInventoryInputObjectSchema), z.lazy(() => AgricultureInventoryMovementUncheckedUpdateWithoutInventoryInputObjectSchema)]),
  create: z.union([z.lazy(() => AgricultureInventoryMovementCreateWithoutInventoryInputObjectSchema), z.lazy(() => AgricultureInventoryMovementUncheckedCreateWithoutInventoryInputObjectSchema)])
}).strict();
export const AgricultureInventoryMovementUpsertWithWhereUniqueWithoutInventoryInputObjectSchema: z.ZodType<Prisma.AgricultureInventoryMovementUpsertWithWhereUniqueWithoutInventoryInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureInventoryMovementUpsertWithWhereUniqueWithoutInventoryInput>;
export const AgricultureInventoryMovementUpsertWithWhereUniqueWithoutInventoryInputObjectZodSchema = makeSchema();
