import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutPreferenceInputObjectSchema as UserCreateWithoutPreferenceInputObjectSchema } from './UserCreateWithoutPreferenceInput.schema';
import { UserUncheckedCreateWithoutPreferenceInputObjectSchema as UserUncheckedCreateWithoutPreferenceInputObjectSchema } from './UserUncheckedCreateWithoutPreferenceInput.schema';
import { UserCreateOrConnectWithoutPreferenceInputObjectSchema as UserCreateOrConnectWithoutPreferenceInputObjectSchema } from './UserCreateOrConnectWithoutPreferenceInput.schema';
import { UserUpsertWithoutPreferenceInputObjectSchema as UserUpsertWithoutPreferenceInputObjectSchema } from './UserUpsertWithoutPreferenceInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutPreferenceInputObjectSchema as UserUpdateToOneWithWhereWithoutPreferenceInputObjectSchema } from './UserUpdateToOneWithWhereWithoutPreferenceInput.schema';
import { UserUpdateWithoutPreferenceInputObjectSchema as UserUpdateWithoutPreferenceInputObjectSchema } from './UserUpdateWithoutPreferenceInput.schema';
import { UserUncheckedUpdateWithoutPreferenceInputObjectSchema as UserUncheckedUpdateWithoutPreferenceInputObjectSchema } from './UserUncheckedUpdateWithoutPreferenceInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutPreferenceInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutPreferenceInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPreferenceInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutPreferenceInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutPreferenceInputObjectSchema), z.lazy(() => UserUpdateWithoutPreferenceInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutPreferenceInputObjectSchema)]).optional()
}).strict();
export const UserUpdateOneRequiredWithoutPreferenceNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutPreferenceNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneRequiredWithoutPreferenceNestedInput>;
export const UserUpdateOneRequiredWithoutPreferenceNestedInputObjectZodSchema = makeSchema();
