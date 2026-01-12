import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutWarehouseItemsInputObjectSchema as UserUpdateWithoutWarehouseItemsInputObjectSchema } from './UserUpdateWithoutWarehouseItemsInput.schema';
import { UserUncheckedUpdateWithoutWarehouseItemsInputObjectSchema as UserUncheckedUpdateWithoutWarehouseItemsInputObjectSchema } from './UserUncheckedUpdateWithoutWarehouseItemsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutWarehouseItemsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutWarehouseItemsInputObjectSchema)])
}).strict();
export const UserUpdateToOneWithWhereWithoutWarehouseItemsInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutWarehouseItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutWarehouseItemsInput>;
export const UserUpdateToOneWithWhereWithoutWarehouseItemsInputObjectZodSchema = makeSchema();
