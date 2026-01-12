import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutCulinaryPrepTasksInputObjectSchema as UserCreateWithoutCulinaryPrepTasksInputObjectSchema } from './UserCreateWithoutCulinaryPrepTasksInput.schema';
import { UserUncheckedCreateWithoutCulinaryPrepTasksInputObjectSchema as UserUncheckedCreateWithoutCulinaryPrepTasksInputObjectSchema } from './UserUncheckedCreateWithoutCulinaryPrepTasksInput.schema';
import { UserCreateOrConnectWithoutCulinaryPrepTasksInputObjectSchema as UserCreateOrConnectWithoutCulinaryPrepTasksInputObjectSchema } from './UserCreateOrConnectWithoutCulinaryPrepTasksInput.schema';
import { UserUpsertWithoutCulinaryPrepTasksInputObjectSchema as UserUpsertWithoutCulinaryPrepTasksInputObjectSchema } from './UserUpsertWithoutCulinaryPrepTasksInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutCulinaryPrepTasksInputObjectSchema as UserUpdateToOneWithWhereWithoutCulinaryPrepTasksInputObjectSchema } from './UserUpdateToOneWithWhereWithoutCulinaryPrepTasksInput.schema';
import { UserUpdateWithoutCulinaryPrepTasksInputObjectSchema as UserUpdateWithoutCulinaryPrepTasksInputObjectSchema } from './UserUpdateWithoutCulinaryPrepTasksInput.schema';
import { UserUncheckedUpdateWithoutCulinaryPrepTasksInputObjectSchema as UserUncheckedUpdateWithoutCulinaryPrepTasksInputObjectSchema } from './UserUncheckedUpdateWithoutCulinaryPrepTasksInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutCulinaryPrepTasksInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutCulinaryPrepTasksInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCulinaryPrepTasksInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutCulinaryPrepTasksInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutCulinaryPrepTasksInputObjectSchema), z.lazy(() => UserUpdateWithoutCulinaryPrepTasksInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutCulinaryPrepTasksInputObjectSchema)]).optional()
}).strict();
export const UserUpdateOneRequiredWithoutCulinaryPrepTasksNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutCulinaryPrepTasksNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneRequiredWithoutCulinaryPrepTasksNestedInput>;
export const UserUpdateOneRequiredWithoutCulinaryPrepTasksNestedInputObjectZodSchema = makeSchema();
