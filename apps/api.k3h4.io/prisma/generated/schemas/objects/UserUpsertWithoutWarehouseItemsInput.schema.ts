import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUpdateWithoutWarehouseItemsInputObjectSchema as UserUpdateWithoutWarehouseItemsInputObjectSchema } from './UserUpdateWithoutWarehouseItemsInput.schema';
import { UserUncheckedUpdateWithoutWarehouseItemsInputObjectSchema as UserUncheckedUpdateWithoutWarehouseItemsInputObjectSchema } from './UserUncheckedUpdateWithoutWarehouseItemsInput.schema';
import { UserCreateWithoutWarehouseItemsInputObjectSchema as UserCreateWithoutWarehouseItemsInputObjectSchema } from './UserCreateWithoutWarehouseItemsInput.schema';
import { UserUncheckedCreateWithoutWarehouseItemsInputObjectSchema as UserUncheckedCreateWithoutWarehouseItemsInputObjectSchema } from './UserUncheckedCreateWithoutWarehouseItemsInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutWarehouseItemsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutWarehouseItemsInputObjectSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutWarehouseItemsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutWarehouseItemsInputObjectSchema)]),
  where: z.lazy(() => UserWhereInputObjectSchema).optional()
}).strict();
export const UserUpsertWithoutWarehouseItemsInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutWarehouseItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutWarehouseItemsInput>;
export const UserUpsertWithoutWarehouseItemsInputObjectZodSchema = makeSchema();
