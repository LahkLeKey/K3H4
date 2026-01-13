import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutCulinaryMenuItemsInputObjectSchema as UserCreateWithoutCulinaryMenuItemsInputObjectSchema } from './UserCreateWithoutCulinaryMenuItemsInput.schema';
import { UserUncheckedCreateWithoutCulinaryMenuItemsInputObjectSchema as UserUncheckedCreateWithoutCulinaryMenuItemsInputObjectSchema } from './UserUncheckedCreateWithoutCulinaryMenuItemsInput.schema';
import { UserCreateOrConnectWithoutCulinaryMenuItemsInputObjectSchema as UserCreateOrConnectWithoutCulinaryMenuItemsInputObjectSchema } from './UserCreateOrConnectWithoutCulinaryMenuItemsInput.schema';
import { UserUpsertWithoutCulinaryMenuItemsInputObjectSchema as UserUpsertWithoutCulinaryMenuItemsInputObjectSchema } from './UserUpsertWithoutCulinaryMenuItemsInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutCulinaryMenuItemsInputObjectSchema as UserUpdateToOneWithWhereWithoutCulinaryMenuItemsInputObjectSchema } from './UserUpdateToOneWithWhereWithoutCulinaryMenuItemsInput.schema';
import { UserUpdateWithoutCulinaryMenuItemsInputObjectSchema as UserUpdateWithoutCulinaryMenuItemsInputObjectSchema } from './UserUpdateWithoutCulinaryMenuItemsInput.schema';
import { UserUncheckedUpdateWithoutCulinaryMenuItemsInputObjectSchema as UserUncheckedUpdateWithoutCulinaryMenuItemsInputObjectSchema } from './UserUncheckedUpdateWithoutCulinaryMenuItemsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutCulinaryMenuItemsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutCulinaryMenuItemsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCulinaryMenuItemsInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutCulinaryMenuItemsInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutCulinaryMenuItemsInputObjectSchema), z.lazy(() => UserUpdateWithoutCulinaryMenuItemsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutCulinaryMenuItemsInputObjectSchema)]).optional()
}).strict();
export const UserUpdateOneRequiredWithoutCulinaryMenuItemsNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutCulinaryMenuItemsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneRequiredWithoutCulinaryMenuItemsNestedInput>;
export const UserUpdateOneRequiredWithoutCulinaryMenuItemsNestedInputObjectZodSchema = makeSchema();
