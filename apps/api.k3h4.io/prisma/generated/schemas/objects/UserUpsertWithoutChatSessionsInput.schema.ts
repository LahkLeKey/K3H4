import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUpdateWithoutChatSessionsInputObjectSchema as UserUpdateWithoutChatSessionsInputObjectSchema } from './UserUpdateWithoutChatSessionsInput.schema';
import { UserUncheckedUpdateWithoutChatSessionsInputObjectSchema as UserUncheckedUpdateWithoutChatSessionsInputObjectSchema } from './UserUncheckedUpdateWithoutChatSessionsInput.schema';
import { UserCreateWithoutChatSessionsInputObjectSchema as UserCreateWithoutChatSessionsInputObjectSchema } from './UserCreateWithoutChatSessionsInput.schema';
import { UserUncheckedCreateWithoutChatSessionsInputObjectSchema as UserUncheckedCreateWithoutChatSessionsInputObjectSchema } from './UserUncheckedCreateWithoutChatSessionsInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutChatSessionsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutChatSessionsInputObjectSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutChatSessionsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutChatSessionsInputObjectSchema)]),
  where: z.lazy(() => UserWhereInputObjectSchema).optional()
}).strict();
export const UserUpsertWithoutChatSessionsInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutChatSessionsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutChatSessionsInput>;
export const UserUpsertWithoutChatSessionsInputObjectZodSchema = makeSchema();
