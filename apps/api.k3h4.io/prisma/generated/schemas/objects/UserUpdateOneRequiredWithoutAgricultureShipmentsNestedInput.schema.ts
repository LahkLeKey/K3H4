import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutAgricultureShipmentsInputObjectSchema as UserCreateWithoutAgricultureShipmentsInputObjectSchema } from './UserCreateWithoutAgricultureShipmentsInput.schema';
import { UserUncheckedCreateWithoutAgricultureShipmentsInputObjectSchema as UserUncheckedCreateWithoutAgricultureShipmentsInputObjectSchema } from './UserUncheckedCreateWithoutAgricultureShipmentsInput.schema';
import { UserCreateOrConnectWithoutAgricultureShipmentsInputObjectSchema as UserCreateOrConnectWithoutAgricultureShipmentsInputObjectSchema } from './UserCreateOrConnectWithoutAgricultureShipmentsInput.schema';
import { UserUpsertWithoutAgricultureShipmentsInputObjectSchema as UserUpsertWithoutAgricultureShipmentsInputObjectSchema } from './UserUpsertWithoutAgricultureShipmentsInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutAgricultureShipmentsInputObjectSchema as UserUpdateToOneWithWhereWithoutAgricultureShipmentsInputObjectSchema } from './UserUpdateToOneWithWhereWithoutAgricultureShipmentsInput.schema';
import { UserUpdateWithoutAgricultureShipmentsInputObjectSchema as UserUpdateWithoutAgricultureShipmentsInputObjectSchema } from './UserUpdateWithoutAgricultureShipmentsInput.schema';
import { UserUncheckedUpdateWithoutAgricultureShipmentsInputObjectSchema as UserUncheckedUpdateWithoutAgricultureShipmentsInputObjectSchema } from './UserUncheckedUpdateWithoutAgricultureShipmentsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutAgricultureShipmentsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutAgricultureShipmentsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAgricultureShipmentsInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAgricultureShipmentsInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutAgricultureShipmentsInputObjectSchema), z.lazy(() => UserUpdateWithoutAgricultureShipmentsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutAgricultureShipmentsInputObjectSchema)]).optional()
}).strict();
export const UserUpdateOneRequiredWithoutAgricultureShipmentsNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAgricultureShipmentsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneRequiredWithoutAgricultureShipmentsNestedInput>;
export const UserUpdateOneRequiredWithoutAgricultureShipmentsNestedInputObjectZodSchema = makeSchema();
