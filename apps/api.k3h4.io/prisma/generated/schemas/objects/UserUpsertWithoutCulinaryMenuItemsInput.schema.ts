import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUpdateWithoutCulinaryMenuItemsInputObjectSchema as UserUpdateWithoutCulinaryMenuItemsInputObjectSchema } from './UserUpdateWithoutCulinaryMenuItemsInput.schema';
import { UserUncheckedUpdateWithoutCulinaryMenuItemsInputObjectSchema as UserUncheckedUpdateWithoutCulinaryMenuItemsInputObjectSchema } from './UserUncheckedUpdateWithoutCulinaryMenuItemsInput.schema';
import { UserCreateWithoutCulinaryMenuItemsInputObjectSchema as UserCreateWithoutCulinaryMenuItemsInputObjectSchema } from './UserCreateWithoutCulinaryMenuItemsInput.schema';
import { UserUncheckedCreateWithoutCulinaryMenuItemsInputObjectSchema as UserUncheckedCreateWithoutCulinaryMenuItemsInputObjectSchema } from './UserUncheckedCreateWithoutCulinaryMenuItemsInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutCulinaryMenuItemsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutCulinaryMenuItemsInputObjectSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutCulinaryMenuItemsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutCulinaryMenuItemsInputObjectSchema)]),
  where: z.lazy(() => UserWhereInputObjectSchema).optional()
}).strict();
export const UserUpsertWithoutCulinaryMenuItemsInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutCulinaryMenuItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutCulinaryMenuItemsInput>;
export const UserUpsertWithoutCulinaryMenuItemsInputObjectZodSchema = makeSchema();
