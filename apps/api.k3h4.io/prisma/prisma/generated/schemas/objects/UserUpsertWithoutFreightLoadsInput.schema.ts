import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUpdateWithoutFreightLoadsInputObjectSchema as UserUpdateWithoutFreightLoadsInputObjectSchema } from './UserUpdateWithoutFreightLoadsInput.schema';
import { UserUncheckedUpdateWithoutFreightLoadsInputObjectSchema as UserUncheckedUpdateWithoutFreightLoadsInputObjectSchema } from './UserUncheckedUpdateWithoutFreightLoadsInput.schema';
import { UserCreateWithoutFreightLoadsInputObjectSchema as UserCreateWithoutFreightLoadsInputObjectSchema } from './UserCreateWithoutFreightLoadsInput.schema';
import { UserUncheckedCreateWithoutFreightLoadsInputObjectSchema as UserUncheckedCreateWithoutFreightLoadsInputObjectSchema } from './UserUncheckedCreateWithoutFreightLoadsInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutFreightLoadsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutFreightLoadsInputObjectSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutFreightLoadsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutFreightLoadsInputObjectSchema)]),
  where: z.lazy(() => UserWhereInputObjectSchema).optional()
}).strict();
export const UserUpsertWithoutFreightLoadsInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutFreightLoadsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutFreightLoadsInput>;
export const UserUpsertWithoutFreightLoadsInputObjectZodSchema = makeSchema();
