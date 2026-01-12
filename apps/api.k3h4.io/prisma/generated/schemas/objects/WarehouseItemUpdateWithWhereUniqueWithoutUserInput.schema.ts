import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { WarehouseItemWhereUniqueInputObjectSchema as WarehouseItemWhereUniqueInputObjectSchema } from './WarehouseItemWhereUniqueInput.schema';
import { WarehouseItemUpdateWithoutUserInputObjectSchema as WarehouseItemUpdateWithoutUserInputObjectSchema } from './WarehouseItemUpdateWithoutUserInput.schema';
import { WarehouseItemUncheckedUpdateWithoutUserInputObjectSchema as WarehouseItemUncheckedUpdateWithoutUserInputObjectSchema } from './WarehouseItemUncheckedUpdateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => WarehouseItemWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => WarehouseItemUpdateWithoutUserInputObjectSchema), z.lazy(() => WarehouseItemUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const WarehouseItemUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.WarehouseItemUpdateWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.WarehouseItemUpdateWithWhereUniqueWithoutUserInput>;
export const WarehouseItemUpdateWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
