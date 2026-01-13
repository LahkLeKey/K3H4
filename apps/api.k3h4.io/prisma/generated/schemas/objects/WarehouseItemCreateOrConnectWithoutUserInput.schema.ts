import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { WarehouseItemWhereUniqueInputObjectSchema as WarehouseItemWhereUniqueInputObjectSchema } from './WarehouseItemWhereUniqueInput.schema';
import { WarehouseItemCreateWithoutUserInputObjectSchema as WarehouseItemCreateWithoutUserInputObjectSchema } from './WarehouseItemCreateWithoutUserInput.schema';
import { WarehouseItemUncheckedCreateWithoutUserInputObjectSchema as WarehouseItemUncheckedCreateWithoutUserInputObjectSchema } from './WarehouseItemUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => WarehouseItemWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => WarehouseItemCreateWithoutUserInputObjectSchema), z.lazy(() => WarehouseItemUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const WarehouseItemCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.WarehouseItemCreateOrConnectWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.WarehouseItemCreateOrConnectWithoutUserInput>;
export const WarehouseItemCreateOrConnectWithoutUserInputObjectZodSchema = makeSchema();
