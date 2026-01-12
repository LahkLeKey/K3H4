import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutAgricultureTasksInputObjectSchema as UserCreateWithoutAgricultureTasksInputObjectSchema } from './UserCreateWithoutAgricultureTasksInput.schema';
import { UserUncheckedCreateWithoutAgricultureTasksInputObjectSchema as UserUncheckedCreateWithoutAgricultureTasksInputObjectSchema } from './UserUncheckedCreateWithoutAgricultureTasksInput.schema';
import { UserCreateOrConnectWithoutAgricultureTasksInputObjectSchema as UserCreateOrConnectWithoutAgricultureTasksInputObjectSchema } from './UserCreateOrConnectWithoutAgricultureTasksInput.schema';
import { UserUpsertWithoutAgricultureTasksInputObjectSchema as UserUpsertWithoutAgricultureTasksInputObjectSchema } from './UserUpsertWithoutAgricultureTasksInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutAgricultureTasksInputObjectSchema as UserUpdateToOneWithWhereWithoutAgricultureTasksInputObjectSchema } from './UserUpdateToOneWithWhereWithoutAgricultureTasksInput.schema';
import { UserUpdateWithoutAgricultureTasksInputObjectSchema as UserUpdateWithoutAgricultureTasksInputObjectSchema } from './UserUpdateWithoutAgricultureTasksInput.schema';
import { UserUncheckedUpdateWithoutAgricultureTasksInputObjectSchema as UserUncheckedUpdateWithoutAgricultureTasksInputObjectSchema } from './UserUncheckedUpdateWithoutAgricultureTasksInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutAgricultureTasksInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutAgricultureTasksInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAgricultureTasksInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAgricultureTasksInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutAgricultureTasksInputObjectSchema), z.lazy(() => UserUpdateWithoutAgricultureTasksInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutAgricultureTasksInputObjectSchema)]).optional()
}).strict();
export const UserUpdateOneRequiredWithoutAgricultureTasksNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAgricultureTasksNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneRequiredWithoutAgricultureTasksNestedInput>;
export const UserUpdateOneRequiredWithoutAgricultureTasksNestedInputObjectZodSchema = makeSchema();
