import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUpdateWithoutProviderGrantsInputObjectSchema as UserUpdateWithoutProviderGrantsInputObjectSchema } from './UserUpdateWithoutProviderGrantsInput.schema';
import { UserUncheckedUpdateWithoutProviderGrantsInputObjectSchema as UserUncheckedUpdateWithoutProviderGrantsInputObjectSchema } from './UserUncheckedUpdateWithoutProviderGrantsInput.schema';
import { UserCreateWithoutProviderGrantsInputObjectSchema as UserCreateWithoutProviderGrantsInputObjectSchema } from './UserCreateWithoutProviderGrantsInput.schema';
import { UserUncheckedCreateWithoutProviderGrantsInputObjectSchema as UserUncheckedCreateWithoutProviderGrantsInputObjectSchema } from './UserUncheckedCreateWithoutProviderGrantsInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutProviderGrantsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutProviderGrantsInputObjectSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutProviderGrantsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutProviderGrantsInputObjectSchema)]),
  where: z.lazy(() => UserWhereInputObjectSchema).optional()
}).strict();
export const UserUpsertWithoutProviderGrantsInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutProviderGrantsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutProviderGrantsInput>;
export const UserUpsertWithoutProviderGrantsInputObjectZodSchema = makeSchema();
