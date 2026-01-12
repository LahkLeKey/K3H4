import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutWarehouseItemsInputObjectSchema as UserCreateWithoutWarehouseItemsInputObjectSchema } from './UserCreateWithoutWarehouseItemsInput.schema';
import { UserUncheckedCreateWithoutWarehouseItemsInputObjectSchema as UserUncheckedCreateWithoutWarehouseItemsInputObjectSchema } from './UserUncheckedCreateWithoutWarehouseItemsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutWarehouseItemsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutWarehouseItemsInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutWarehouseItemsInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutWarehouseItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutWarehouseItemsInput>;
export const UserCreateOrConnectWithoutWarehouseItemsInputObjectZodSchema = makeSchema();
