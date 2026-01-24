import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutChatSessionsInputObjectSchema as UserUpdateWithoutChatSessionsInputObjectSchema } from './UserUpdateWithoutChatSessionsInput.schema';
import { UserUncheckedUpdateWithoutChatSessionsInputObjectSchema as UserUncheckedUpdateWithoutChatSessionsInputObjectSchema } from './UserUncheckedUpdateWithoutChatSessionsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutChatSessionsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutChatSessionsInputObjectSchema)])
}).strict();
export const UserUpdateToOneWithWhereWithoutChatSessionsInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutChatSessionsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutChatSessionsInput>;
export const UserUpdateToOneWithWhereWithoutChatSessionsInputObjectZodSchema = makeSchema();
