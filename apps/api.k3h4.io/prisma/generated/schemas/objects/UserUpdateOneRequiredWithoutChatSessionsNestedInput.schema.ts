import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutChatSessionsInputObjectSchema as UserCreateWithoutChatSessionsInputObjectSchema } from './UserCreateWithoutChatSessionsInput.schema';
import { UserUncheckedCreateWithoutChatSessionsInputObjectSchema as UserUncheckedCreateWithoutChatSessionsInputObjectSchema } from './UserUncheckedCreateWithoutChatSessionsInput.schema';
import { UserCreateOrConnectWithoutChatSessionsInputObjectSchema as UserCreateOrConnectWithoutChatSessionsInputObjectSchema } from './UserCreateOrConnectWithoutChatSessionsInput.schema';
import { UserUpsertWithoutChatSessionsInputObjectSchema as UserUpsertWithoutChatSessionsInputObjectSchema } from './UserUpsertWithoutChatSessionsInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutChatSessionsInputObjectSchema as UserUpdateToOneWithWhereWithoutChatSessionsInputObjectSchema } from './UserUpdateToOneWithWhereWithoutChatSessionsInput.schema';
import { UserUpdateWithoutChatSessionsInputObjectSchema as UserUpdateWithoutChatSessionsInputObjectSchema } from './UserUpdateWithoutChatSessionsInput.schema';
import { UserUncheckedUpdateWithoutChatSessionsInputObjectSchema as UserUncheckedUpdateWithoutChatSessionsInputObjectSchema } from './UserUncheckedUpdateWithoutChatSessionsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutChatSessionsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutChatSessionsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutChatSessionsInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutChatSessionsInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutChatSessionsInputObjectSchema), z.lazy(() => UserUpdateWithoutChatSessionsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutChatSessionsInputObjectSchema)]).optional()
}).strict();
export const UserUpdateOneRequiredWithoutChatSessionsNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutChatSessionsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneRequiredWithoutChatSessionsNestedInput>;
export const UserUpdateOneRequiredWithoutChatSessionsNestedInputObjectZodSchema = makeSchema();
