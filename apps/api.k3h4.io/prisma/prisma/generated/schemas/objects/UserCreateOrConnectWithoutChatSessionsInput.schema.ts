import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutChatSessionsInputObjectSchema as UserCreateWithoutChatSessionsInputObjectSchema } from './UserCreateWithoutChatSessionsInput.schema';
import { UserUncheckedCreateWithoutChatSessionsInputObjectSchema as UserUncheckedCreateWithoutChatSessionsInputObjectSchema } from './UserUncheckedCreateWithoutChatSessionsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutChatSessionsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutChatSessionsInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutChatSessionsInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutChatSessionsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutChatSessionsInput>;
export const UserCreateOrConnectWithoutChatSessionsInputObjectZodSchema = makeSchema();
