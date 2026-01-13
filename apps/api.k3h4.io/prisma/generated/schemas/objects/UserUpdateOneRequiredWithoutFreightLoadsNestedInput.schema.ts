import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutFreightLoadsInputObjectSchema as UserCreateWithoutFreightLoadsInputObjectSchema } from './UserCreateWithoutFreightLoadsInput.schema';
import { UserUncheckedCreateWithoutFreightLoadsInputObjectSchema as UserUncheckedCreateWithoutFreightLoadsInputObjectSchema } from './UserUncheckedCreateWithoutFreightLoadsInput.schema';
import { UserCreateOrConnectWithoutFreightLoadsInputObjectSchema as UserCreateOrConnectWithoutFreightLoadsInputObjectSchema } from './UserCreateOrConnectWithoutFreightLoadsInput.schema';
import { UserUpsertWithoutFreightLoadsInputObjectSchema as UserUpsertWithoutFreightLoadsInputObjectSchema } from './UserUpsertWithoutFreightLoadsInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutFreightLoadsInputObjectSchema as UserUpdateToOneWithWhereWithoutFreightLoadsInputObjectSchema } from './UserUpdateToOneWithWhereWithoutFreightLoadsInput.schema';
import { UserUpdateWithoutFreightLoadsInputObjectSchema as UserUpdateWithoutFreightLoadsInputObjectSchema } from './UserUpdateWithoutFreightLoadsInput.schema';
import { UserUncheckedUpdateWithoutFreightLoadsInputObjectSchema as UserUncheckedUpdateWithoutFreightLoadsInputObjectSchema } from './UserUncheckedUpdateWithoutFreightLoadsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutFreightLoadsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutFreightLoadsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutFreightLoadsInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutFreightLoadsInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutFreightLoadsInputObjectSchema), z.lazy(() => UserUpdateWithoutFreightLoadsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutFreightLoadsInputObjectSchema)]).optional()
}).strict();
export const UserUpdateOneRequiredWithoutFreightLoadsNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutFreightLoadsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneRequiredWithoutFreightLoadsNestedInput>;
export const UserUpdateOneRequiredWithoutFreightLoadsNestedInputObjectZodSchema = makeSchema();
