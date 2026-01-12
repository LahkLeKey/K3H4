import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutCulinaryMenuItemsInputObjectSchema as UserCreateWithoutCulinaryMenuItemsInputObjectSchema } from './UserCreateWithoutCulinaryMenuItemsInput.schema';
import { UserUncheckedCreateWithoutCulinaryMenuItemsInputObjectSchema as UserUncheckedCreateWithoutCulinaryMenuItemsInputObjectSchema } from './UserUncheckedCreateWithoutCulinaryMenuItemsInput.schema';
import { UserCreateOrConnectWithoutCulinaryMenuItemsInputObjectSchema as UserCreateOrConnectWithoutCulinaryMenuItemsInputObjectSchema } from './UserCreateOrConnectWithoutCulinaryMenuItemsInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutCulinaryMenuItemsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutCulinaryMenuItemsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCulinaryMenuItemsInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutCulinaryMenuItemsInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutCulinaryMenuItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutCulinaryMenuItemsInput>;
export const UserCreateNestedOneWithoutCulinaryMenuItemsInputObjectZodSchema = makeSchema();
