import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutCulinaryMenuItemsInputObjectSchema as UserCreateWithoutCulinaryMenuItemsInputObjectSchema } from './UserCreateWithoutCulinaryMenuItemsInput.schema';
import { UserUncheckedCreateWithoutCulinaryMenuItemsInputObjectSchema as UserUncheckedCreateWithoutCulinaryMenuItemsInputObjectSchema } from './UserUncheckedCreateWithoutCulinaryMenuItemsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutCulinaryMenuItemsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutCulinaryMenuItemsInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutCulinaryMenuItemsInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutCulinaryMenuItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutCulinaryMenuItemsInput>;
export const UserCreateOrConnectWithoutCulinaryMenuItemsInputObjectZodSchema = makeSchema();
