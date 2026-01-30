import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutChatSessionsInputObjectSchema as UserCreateWithoutChatSessionsInputObjectSchema } from './UserCreateWithoutChatSessionsInput.schema';
import { UserUncheckedCreateWithoutChatSessionsInputObjectSchema as UserUncheckedCreateWithoutChatSessionsInputObjectSchema } from './UserUncheckedCreateWithoutChatSessionsInput.schema';
import { UserCreateOrConnectWithoutChatSessionsInputObjectSchema as UserCreateOrConnectWithoutChatSessionsInputObjectSchema } from './UserCreateOrConnectWithoutChatSessionsInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutChatSessionsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutChatSessionsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutChatSessionsInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutChatSessionsInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutChatSessionsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutChatSessionsInput>;
export const UserCreateNestedOneWithoutChatSessionsInputObjectZodSchema = makeSchema();
