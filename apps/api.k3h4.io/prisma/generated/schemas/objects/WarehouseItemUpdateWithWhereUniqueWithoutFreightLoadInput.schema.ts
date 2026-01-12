import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { WarehouseItemWhereUniqueInputObjectSchema as WarehouseItemWhereUniqueInputObjectSchema } from './WarehouseItemWhereUniqueInput.schema';
import { WarehouseItemUpdateWithoutFreightLoadInputObjectSchema as WarehouseItemUpdateWithoutFreightLoadInputObjectSchema } from './WarehouseItemUpdateWithoutFreightLoadInput.schema';
import { WarehouseItemUncheckedUpdateWithoutFreightLoadInputObjectSchema as WarehouseItemUncheckedUpdateWithoutFreightLoadInputObjectSchema } from './WarehouseItemUncheckedUpdateWithoutFreightLoadInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => WarehouseItemWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => WarehouseItemUpdateWithoutFreightLoadInputObjectSchema), z.lazy(() => WarehouseItemUncheckedUpdateWithoutFreightLoadInputObjectSchema)])
}).strict();
export const WarehouseItemUpdateWithWhereUniqueWithoutFreightLoadInputObjectSchema: z.ZodType<Prisma.WarehouseItemUpdateWithWhereUniqueWithoutFreightLoadInput> = makeSchema() as unknown as z.ZodType<Prisma.WarehouseItemUpdateWithWhereUniqueWithoutFreightLoadInput>;
export const WarehouseItemUpdateWithWhereUniqueWithoutFreightLoadInputObjectZodSchema = makeSchema();
