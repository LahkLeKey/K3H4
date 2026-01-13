import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUpdateWithoutAgricultureShipmentsInputObjectSchema as UserUpdateWithoutAgricultureShipmentsInputObjectSchema } from './UserUpdateWithoutAgricultureShipmentsInput.schema';
import { UserUncheckedUpdateWithoutAgricultureShipmentsInputObjectSchema as UserUncheckedUpdateWithoutAgricultureShipmentsInputObjectSchema } from './UserUncheckedUpdateWithoutAgricultureShipmentsInput.schema';
import { UserCreateWithoutAgricultureShipmentsInputObjectSchema as UserCreateWithoutAgricultureShipmentsInputObjectSchema } from './UserCreateWithoutAgricultureShipmentsInput.schema';
import { UserUncheckedCreateWithoutAgricultureShipmentsInputObjectSchema as UserUncheckedCreateWithoutAgricultureShipmentsInputObjectSchema } from './UserUncheckedCreateWithoutAgricultureShipmentsInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutAgricultureShipmentsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutAgricultureShipmentsInputObjectSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutAgricultureShipmentsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutAgricultureShipmentsInputObjectSchema)]),
  where: z.lazy(() => UserWhereInputObjectSchema).optional()
}).strict();
export const UserUpsertWithoutAgricultureShipmentsInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutAgricultureShipmentsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutAgricultureShipmentsInput>;
export const UserUpsertWithoutAgricultureShipmentsInputObjectZodSchema = makeSchema();
