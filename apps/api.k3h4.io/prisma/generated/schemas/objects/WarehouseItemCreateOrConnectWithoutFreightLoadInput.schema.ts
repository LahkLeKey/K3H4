import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { WarehouseItemWhereUniqueInputObjectSchema as WarehouseItemWhereUniqueInputObjectSchema } from './WarehouseItemWhereUniqueInput.schema';
import { WarehouseItemCreateWithoutFreightLoadInputObjectSchema as WarehouseItemCreateWithoutFreightLoadInputObjectSchema } from './WarehouseItemCreateWithoutFreightLoadInput.schema';
import { WarehouseItemUncheckedCreateWithoutFreightLoadInputObjectSchema as WarehouseItemUncheckedCreateWithoutFreightLoadInputObjectSchema } from './WarehouseItemUncheckedCreateWithoutFreightLoadInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => WarehouseItemWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => WarehouseItemCreateWithoutFreightLoadInputObjectSchema), z.lazy(() => WarehouseItemUncheckedCreateWithoutFreightLoadInputObjectSchema)])
}).strict();
export const WarehouseItemCreateOrConnectWithoutFreightLoadInputObjectSchema: z.ZodType<Prisma.WarehouseItemCreateOrConnectWithoutFreightLoadInput> = makeSchema() as unknown as z.ZodType<Prisma.WarehouseItemCreateOrConnectWithoutFreightLoadInput>;
export const WarehouseItemCreateOrConnectWithoutFreightLoadInputObjectZodSchema = makeSchema();
