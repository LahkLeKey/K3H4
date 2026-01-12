import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutWarehouseItemsInputObjectSchema as UserCreateWithoutWarehouseItemsInputObjectSchema } from './UserCreateWithoutWarehouseItemsInput.schema';
import { UserUncheckedCreateWithoutWarehouseItemsInputObjectSchema as UserUncheckedCreateWithoutWarehouseItemsInputObjectSchema } from './UserUncheckedCreateWithoutWarehouseItemsInput.schema';
import { UserCreateOrConnectWithoutWarehouseItemsInputObjectSchema as UserCreateOrConnectWithoutWarehouseItemsInputObjectSchema } from './UserCreateOrConnectWithoutWarehouseItemsInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutWarehouseItemsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutWarehouseItemsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutWarehouseItemsInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutWarehouseItemsInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutWarehouseItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutWarehouseItemsInput>;
export const UserCreateNestedOneWithoutWarehouseItemsInputObjectZodSchema = makeSchema();
