import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUpdateWithoutPreferenceInputObjectSchema as UserUpdateWithoutPreferenceInputObjectSchema } from './UserUpdateWithoutPreferenceInput.schema';
import { UserUncheckedUpdateWithoutPreferenceInputObjectSchema as UserUncheckedUpdateWithoutPreferenceInputObjectSchema } from './UserUncheckedUpdateWithoutPreferenceInput.schema';
import { UserCreateWithoutPreferenceInputObjectSchema as UserCreateWithoutPreferenceInputObjectSchema } from './UserCreateWithoutPreferenceInput.schema';
import { UserUncheckedCreateWithoutPreferenceInputObjectSchema as UserUncheckedCreateWithoutPreferenceInputObjectSchema } from './UserUncheckedCreateWithoutPreferenceInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutPreferenceInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutPreferenceInputObjectSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutPreferenceInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutPreferenceInputObjectSchema)]),
  where: z.lazy(() => UserWhereInputObjectSchema).optional()
}).strict();
export const UserUpsertWithoutPreferenceInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutPreferenceInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutPreferenceInput>;
export const UserUpsertWithoutPreferenceInputObjectZodSchema = makeSchema();
