import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutProviderGrantsInputObjectSchema as UserCreateWithoutProviderGrantsInputObjectSchema } from './UserCreateWithoutProviderGrantsInput.schema';
import { UserUncheckedCreateWithoutProviderGrantsInputObjectSchema as UserUncheckedCreateWithoutProviderGrantsInputObjectSchema } from './UserUncheckedCreateWithoutProviderGrantsInput.schema';
import { UserCreateOrConnectWithoutProviderGrantsInputObjectSchema as UserCreateOrConnectWithoutProviderGrantsInputObjectSchema } from './UserCreateOrConnectWithoutProviderGrantsInput.schema';
import { UserUpsertWithoutProviderGrantsInputObjectSchema as UserUpsertWithoutProviderGrantsInputObjectSchema } from './UserUpsertWithoutProviderGrantsInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutProviderGrantsInputObjectSchema as UserUpdateToOneWithWhereWithoutProviderGrantsInputObjectSchema } from './UserUpdateToOneWithWhereWithoutProviderGrantsInput.schema';
import { UserUpdateWithoutProviderGrantsInputObjectSchema as UserUpdateWithoutProviderGrantsInputObjectSchema } from './UserUpdateWithoutProviderGrantsInput.schema';
import { UserUncheckedUpdateWithoutProviderGrantsInputObjectSchema as UserUncheckedUpdateWithoutProviderGrantsInputObjectSchema } from './UserUncheckedUpdateWithoutProviderGrantsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutProviderGrantsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutProviderGrantsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutProviderGrantsInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutProviderGrantsInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutProviderGrantsInputObjectSchema), z.lazy(() => UserUpdateWithoutProviderGrantsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutProviderGrantsInputObjectSchema)]).optional()
}).strict();
export const UserUpdateOneRequiredWithoutProviderGrantsNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutProviderGrantsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneRequiredWithoutProviderGrantsNestedInput>;
export const UserUpdateOneRequiredWithoutProviderGrantsNestedInputObjectZodSchema = makeSchema();
