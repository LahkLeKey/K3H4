import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutPosStoresInputObjectSchema as UserCreateWithoutPosStoresInputObjectSchema } from './UserCreateWithoutPosStoresInput.schema';
import { UserUncheckedCreateWithoutPosStoresInputObjectSchema as UserUncheckedCreateWithoutPosStoresInputObjectSchema } from './UserUncheckedCreateWithoutPosStoresInput.schema';
import { UserCreateOrConnectWithoutPosStoresInputObjectSchema as UserCreateOrConnectWithoutPosStoresInputObjectSchema } from './UserCreateOrConnectWithoutPosStoresInput.schema';
import { UserUpsertWithoutPosStoresInputObjectSchema as UserUpsertWithoutPosStoresInputObjectSchema } from './UserUpsertWithoutPosStoresInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutPosStoresInputObjectSchema as UserUpdateToOneWithWhereWithoutPosStoresInputObjectSchema } from './UserUpdateToOneWithWhereWithoutPosStoresInput.schema';
import { UserUpdateWithoutPosStoresInputObjectSchema as UserUpdateWithoutPosStoresInputObjectSchema } from './UserUpdateWithoutPosStoresInput.schema';
import { UserUncheckedUpdateWithoutPosStoresInputObjectSchema as UserUncheckedUpdateWithoutPosStoresInputObjectSchema } from './UserUncheckedUpdateWithoutPosStoresInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutPosStoresInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutPosStoresInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPosStoresInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutPosStoresInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutPosStoresInputObjectSchema), z.lazy(() => UserUpdateWithoutPosStoresInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutPosStoresInputObjectSchema)]).optional()
}).strict();
export const UserUpdateOneRequiredWithoutPosStoresNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutPosStoresNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneRequiredWithoutPosStoresNestedInput>;
export const UserUpdateOneRequiredWithoutPosStoresNestedInputObjectZodSchema = makeSchema();
