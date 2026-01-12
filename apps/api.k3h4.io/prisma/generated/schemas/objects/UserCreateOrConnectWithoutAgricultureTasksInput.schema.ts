import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutAgricultureTasksInputObjectSchema as UserCreateWithoutAgricultureTasksInputObjectSchema } from './UserCreateWithoutAgricultureTasksInput.schema';
import { UserUncheckedCreateWithoutAgricultureTasksInputObjectSchema as UserUncheckedCreateWithoutAgricultureTasksInputObjectSchema } from './UserUncheckedCreateWithoutAgricultureTasksInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutAgricultureTasksInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutAgricultureTasksInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutAgricultureTasksInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAgricultureTasksInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutAgricultureTasksInput>;
export const UserCreateOrConnectWithoutAgricultureTasksInputObjectZodSchema = makeSchema();
