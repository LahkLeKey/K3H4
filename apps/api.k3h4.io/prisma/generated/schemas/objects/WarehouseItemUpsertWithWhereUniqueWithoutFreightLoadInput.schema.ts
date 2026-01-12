import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { WarehouseItemWhereUniqueInputObjectSchema as WarehouseItemWhereUniqueInputObjectSchema } from './WarehouseItemWhereUniqueInput.schema';
import { WarehouseItemUpdateWithoutFreightLoadInputObjectSchema as WarehouseItemUpdateWithoutFreightLoadInputObjectSchema } from './WarehouseItemUpdateWithoutFreightLoadInput.schema';
import { WarehouseItemUncheckedUpdateWithoutFreightLoadInputObjectSchema as WarehouseItemUncheckedUpdateWithoutFreightLoadInputObjectSchema } from './WarehouseItemUncheckedUpdateWithoutFreightLoadInput.schema';
import { WarehouseItemCreateWithoutFreightLoadInputObjectSchema as WarehouseItemCreateWithoutFreightLoadInputObjectSchema } from './WarehouseItemCreateWithoutFreightLoadInput.schema';
import { WarehouseItemUncheckedCreateWithoutFreightLoadInputObjectSchema as WarehouseItemUncheckedCreateWithoutFreightLoadInputObjectSchema } from './WarehouseItemUncheckedCreateWithoutFreightLoadInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => WarehouseItemWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => WarehouseItemUpdateWithoutFreightLoadInputObjectSchema), z.lazy(() => WarehouseItemUncheckedUpdateWithoutFreightLoadInputObjectSchema)]),
  create: z.union([z.lazy(() => WarehouseItemCreateWithoutFreightLoadInputObjectSchema), z.lazy(() => WarehouseItemUncheckedCreateWithoutFreightLoadInputObjectSchema)])
}).strict();
export const WarehouseItemUpsertWithWhereUniqueWithoutFreightLoadInputObjectSchema: z.ZodType<Prisma.WarehouseItemUpsertWithWhereUniqueWithoutFreightLoadInput> = makeSchema() as unknown as z.ZodType<Prisma.WarehouseItemUpsertWithWhereUniqueWithoutFreightLoadInput>;
export const WarehouseItemUpsertWithWhereUniqueWithoutFreightLoadInputObjectZodSchema = makeSchema();
