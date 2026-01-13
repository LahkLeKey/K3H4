import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureInventoryMovementWhereUniqueInputObjectSchema as AgricultureInventoryMovementWhereUniqueInputObjectSchema } from './AgricultureInventoryMovementWhereUniqueInput.schema';
import { AgricultureInventoryMovementUpdateWithoutUserInputObjectSchema as AgricultureInventoryMovementUpdateWithoutUserInputObjectSchema } from './AgricultureInventoryMovementUpdateWithoutUserInput.schema';
import { AgricultureInventoryMovementUncheckedUpdateWithoutUserInputObjectSchema as AgricultureInventoryMovementUncheckedUpdateWithoutUserInputObjectSchema } from './AgricultureInventoryMovementUncheckedUpdateWithoutUserInput.schema';
import { AgricultureInventoryMovementCreateWithoutUserInputObjectSchema as AgricultureInventoryMovementCreateWithoutUserInputObjectSchema } from './AgricultureInventoryMovementCreateWithoutUserInput.schema';
import { AgricultureInventoryMovementUncheckedCreateWithoutUserInputObjectSchema as AgricultureInventoryMovementUncheckedCreateWithoutUserInputObjectSchema } from './AgricultureInventoryMovementUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgricultureInventoryMovementWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => AgricultureInventoryMovementUpdateWithoutUserInputObjectSchema), z.lazy(() => AgricultureInventoryMovementUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => AgricultureInventoryMovementCreateWithoutUserInputObjectSchema), z.lazy(() => AgricultureInventoryMovementUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const AgricultureInventoryMovementUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.AgricultureInventoryMovementUpsertWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureInventoryMovementUpsertWithWhereUniqueWithoutUserInput>;
export const AgricultureInventoryMovementUpsertWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
