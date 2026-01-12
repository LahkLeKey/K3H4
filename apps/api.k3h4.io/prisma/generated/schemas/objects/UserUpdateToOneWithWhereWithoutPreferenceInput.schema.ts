import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutPreferenceInputObjectSchema as UserUpdateWithoutPreferenceInputObjectSchema } from './UserUpdateWithoutPreferenceInput.schema';
import { UserUncheckedUpdateWithoutPreferenceInputObjectSchema as UserUncheckedUpdateWithoutPreferenceInputObjectSchema } from './UserUncheckedUpdateWithoutPreferenceInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutPreferenceInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutPreferenceInputObjectSchema)])
}).strict();
export const UserUpdateToOneWithWhereWithoutPreferenceInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutPreferenceInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutPreferenceInput>;
export const UserUpdateToOneWithWhereWithoutPreferenceInputObjectZodSchema = makeSchema();
