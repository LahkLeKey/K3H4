import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutCulinaryMenuItemsInputObjectSchema as UserUpdateWithoutCulinaryMenuItemsInputObjectSchema } from './UserUpdateWithoutCulinaryMenuItemsInput.schema';
import { UserUncheckedUpdateWithoutCulinaryMenuItemsInputObjectSchema as UserUncheckedUpdateWithoutCulinaryMenuItemsInputObjectSchema } from './UserUncheckedUpdateWithoutCulinaryMenuItemsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutCulinaryMenuItemsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutCulinaryMenuItemsInputObjectSchema)])
}).strict();
export const UserUpdateToOneWithWhereWithoutCulinaryMenuItemsInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutCulinaryMenuItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutCulinaryMenuItemsInput>;
export const UserUpdateToOneWithWhereWithoutCulinaryMenuItemsInputObjectZodSchema = makeSchema();
