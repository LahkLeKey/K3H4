import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { WarehouseItemWhereUniqueInputObjectSchema as WarehouseItemWhereUniqueInputObjectSchema } from './WarehouseItemWhereUniqueInput.schema';
import { WarehouseItemUpdateWithoutUserInputObjectSchema as WarehouseItemUpdateWithoutUserInputObjectSchema } from './WarehouseItemUpdateWithoutUserInput.schema';
import { WarehouseItemUncheckedUpdateWithoutUserInputObjectSchema as WarehouseItemUncheckedUpdateWithoutUserInputObjectSchema } from './WarehouseItemUncheckedUpdateWithoutUserInput.schema';
import { WarehouseItemCreateWithoutUserInputObjectSchema as WarehouseItemCreateWithoutUserInputObjectSchema } from './WarehouseItemCreateWithoutUserInput.schema';
import { WarehouseItemUncheckedCreateWithoutUserInputObjectSchema as WarehouseItemUncheckedCreateWithoutUserInputObjectSchema } from './WarehouseItemUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => WarehouseItemWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => WarehouseItemUpdateWithoutUserInputObjectSchema), z.lazy(() => WarehouseItemUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => WarehouseItemCreateWithoutUserInputObjectSchema), z.lazy(() => WarehouseItemUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const WarehouseItemUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.WarehouseItemUpsertWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.WarehouseItemUpsertWithWhereUniqueWithoutUserInput>;
export const WarehouseItemUpsertWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
