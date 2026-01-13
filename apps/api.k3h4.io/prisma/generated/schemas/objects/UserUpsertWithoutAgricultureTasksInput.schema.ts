import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUpdateWithoutAgricultureTasksInputObjectSchema as UserUpdateWithoutAgricultureTasksInputObjectSchema } from './UserUpdateWithoutAgricultureTasksInput.schema';
import { UserUncheckedUpdateWithoutAgricultureTasksInputObjectSchema as UserUncheckedUpdateWithoutAgricultureTasksInputObjectSchema } from './UserUncheckedUpdateWithoutAgricultureTasksInput.schema';
import { UserCreateWithoutAgricultureTasksInputObjectSchema as UserCreateWithoutAgricultureTasksInputObjectSchema } from './UserCreateWithoutAgricultureTasksInput.schema';
import { UserUncheckedCreateWithoutAgricultureTasksInputObjectSchema as UserUncheckedCreateWithoutAgricultureTasksInputObjectSchema } from './UserUncheckedCreateWithoutAgricultureTasksInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutAgricultureTasksInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutAgricultureTasksInputObjectSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutAgricultureTasksInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutAgricultureTasksInputObjectSchema)]),
  where: z.lazy(() => UserWhereInputObjectSchema).optional()
}).strict();
export const UserUpsertWithoutAgricultureTasksInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutAgricultureTasksInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutAgricultureTasksInput>;
export const UserUpsertWithoutAgricultureTasksInputObjectZodSchema = makeSchema();
