import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutAgricultureTasksInputObjectSchema as UserCreateWithoutAgricultureTasksInputObjectSchema } from './UserCreateWithoutAgricultureTasksInput.schema';
import { UserUncheckedCreateWithoutAgricultureTasksInputObjectSchema as UserUncheckedCreateWithoutAgricultureTasksInputObjectSchema } from './UserUncheckedCreateWithoutAgricultureTasksInput.schema';
import { UserCreateOrConnectWithoutAgricultureTasksInputObjectSchema as UserCreateOrConnectWithoutAgricultureTasksInputObjectSchema } from './UserCreateOrConnectWithoutAgricultureTasksInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutAgricultureTasksInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutAgricultureTasksInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAgricultureTasksInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutAgricultureTasksInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAgricultureTasksInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutAgricultureTasksInput>;
export const UserCreateNestedOneWithoutAgricultureTasksInputObjectZodSchema = makeSchema();
