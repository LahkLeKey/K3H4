import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUpdateWithoutCulinaryPrepTasksInputObjectSchema as UserUpdateWithoutCulinaryPrepTasksInputObjectSchema } from './UserUpdateWithoutCulinaryPrepTasksInput.schema';
import { UserUncheckedUpdateWithoutCulinaryPrepTasksInputObjectSchema as UserUncheckedUpdateWithoutCulinaryPrepTasksInputObjectSchema } from './UserUncheckedUpdateWithoutCulinaryPrepTasksInput.schema';
import { UserCreateWithoutCulinaryPrepTasksInputObjectSchema as UserCreateWithoutCulinaryPrepTasksInputObjectSchema } from './UserCreateWithoutCulinaryPrepTasksInput.schema';
import { UserUncheckedCreateWithoutCulinaryPrepTasksInputObjectSchema as UserUncheckedCreateWithoutCulinaryPrepTasksInputObjectSchema } from './UserUncheckedCreateWithoutCulinaryPrepTasksInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutCulinaryPrepTasksInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutCulinaryPrepTasksInputObjectSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutCulinaryPrepTasksInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutCulinaryPrepTasksInputObjectSchema)]),
  where: z.lazy(() => UserWhereInputObjectSchema).optional()
}).strict();
export const UserUpsertWithoutCulinaryPrepTasksInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutCulinaryPrepTasksInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutCulinaryPrepTasksInput>;
export const UserUpsertWithoutCulinaryPrepTasksInputObjectZodSchema = makeSchema();
