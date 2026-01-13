import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutWarehouseItemsInputObjectSchema as UserCreateWithoutWarehouseItemsInputObjectSchema } from './UserCreateWithoutWarehouseItemsInput.schema';
import { UserUncheckedCreateWithoutWarehouseItemsInputObjectSchema as UserUncheckedCreateWithoutWarehouseItemsInputObjectSchema } from './UserUncheckedCreateWithoutWarehouseItemsInput.schema';
import { UserCreateOrConnectWithoutWarehouseItemsInputObjectSchema as UserCreateOrConnectWithoutWarehouseItemsInputObjectSchema } from './UserCreateOrConnectWithoutWarehouseItemsInput.schema';
import { UserUpsertWithoutWarehouseItemsInputObjectSchema as UserUpsertWithoutWarehouseItemsInputObjectSchema } from './UserUpsertWithoutWarehouseItemsInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutWarehouseItemsInputObjectSchema as UserUpdateToOneWithWhereWithoutWarehouseItemsInputObjectSchema } from './UserUpdateToOneWithWhereWithoutWarehouseItemsInput.schema';
import { UserUpdateWithoutWarehouseItemsInputObjectSchema as UserUpdateWithoutWarehouseItemsInputObjectSchema } from './UserUpdateWithoutWarehouseItemsInput.schema';
import { UserUncheckedUpdateWithoutWarehouseItemsInputObjectSchema as UserUncheckedUpdateWithoutWarehouseItemsInputObjectSchema } from './UserUncheckedUpdateWithoutWarehouseItemsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutWarehouseItemsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutWarehouseItemsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutWarehouseItemsInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutWarehouseItemsInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutWarehouseItemsInputObjectSchema), z.lazy(() => UserUpdateWithoutWarehouseItemsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutWarehouseItemsInputObjectSchema)]).optional()
}).strict();
export const UserUpdateOneRequiredWithoutWarehouseItemsNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutWarehouseItemsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneRequiredWithoutWarehouseItemsNestedInput>;
export const UserUpdateOneRequiredWithoutWarehouseItemsNestedInputObjectZodSchema = makeSchema();
