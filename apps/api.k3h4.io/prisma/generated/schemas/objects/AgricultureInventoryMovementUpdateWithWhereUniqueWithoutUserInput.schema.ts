import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureInventoryMovementWhereUniqueInputObjectSchema as AgricultureInventoryMovementWhereUniqueInputObjectSchema } from './AgricultureInventoryMovementWhereUniqueInput.schema';
import { AgricultureInventoryMovementUpdateWithoutUserInputObjectSchema as AgricultureInventoryMovementUpdateWithoutUserInputObjectSchema } from './AgricultureInventoryMovementUpdateWithoutUserInput.schema';
import { AgricultureInventoryMovementUncheckedUpdateWithoutUserInputObjectSchema as AgricultureInventoryMovementUncheckedUpdateWithoutUserInputObjectSchema } from './AgricultureInventoryMovementUncheckedUpdateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgricultureInventoryMovementWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => AgricultureInventoryMovementUpdateWithoutUserInputObjectSchema), z.lazy(() => AgricultureInventoryMovementUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const AgricultureInventoryMovementUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.AgricultureInventoryMovementUpdateWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureInventoryMovementUpdateWithWhereUniqueWithoutUserInput>;
export const AgricultureInventoryMovementUpdateWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
