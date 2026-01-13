import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUpdateWithoutPosStoresInputObjectSchema as UserUpdateWithoutPosStoresInputObjectSchema } from './UserUpdateWithoutPosStoresInput.schema';
import { UserUncheckedUpdateWithoutPosStoresInputObjectSchema as UserUncheckedUpdateWithoutPosStoresInputObjectSchema } from './UserUncheckedUpdateWithoutPosStoresInput.schema';
import { UserCreateWithoutPosStoresInputObjectSchema as UserCreateWithoutPosStoresInputObjectSchema } from './UserCreateWithoutPosStoresInput.schema';
import { UserUncheckedCreateWithoutPosStoresInputObjectSchema as UserUncheckedCreateWithoutPosStoresInputObjectSchema } from './UserUncheckedCreateWithoutPosStoresInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutPosStoresInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutPosStoresInputObjectSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutPosStoresInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutPosStoresInputObjectSchema)]),
  where: z.lazy(() => UserWhereInputObjectSchema).optional()
}).strict();
export const UserUpsertWithoutPosStoresInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutPosStoresInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutPosStoresInput>;
export const UserUpsertWithoutPosStoresInputObjectZodSchema = makeSchema();
