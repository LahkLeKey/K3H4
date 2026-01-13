import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUpdateWithoutCulinarySupplierNeedsInputObjectSchema as UserUpdateWithoutCulinarySupplierNeedsInputObjectSchema } from './UserUpdateWithoutCulinarySupplierNeedsInput.schema';
import { UserUncheckedUpdateWithoutCulinarySupplierNeedsInputObjectSchema as UserUncheckedUpdateWithoutCulinarySupplierNeedsInputObjectSchema } from './UserUncheckedUpdateWithoutCulinarySupplierNeedsInput.schema';
import { UserCreateWithoutCulinarySupplierNeedsInputObjectSchema as UserCreateWithoutCulinarySupplierNeedsInputObjectSchema } from './UserCreateWithoutCulinarySupplierNeedsInput.schema';
import { UserUncheckedCreateWithoutCulinarySupplierNeedsInputObjectSchema as UserUncheckedCreateWithoutCulinarySupplierNeedsInputObjectSchema } from './UserUncheckedCreateWithoutCulinarySupplierNeedsInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutCulinarySupplierNeedsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutCulinarySupplierNeedsInputObjectSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutCulinarySupplierNeedsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutCulinarySupplierNeedsInputObjectSchema)]),
  where: z.lazy(() => UserWhereInputObjectSchema).optional()
}).strict();
export const UserUpsertWithoutCulinarySupplierNeedsInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutCulinarySupplierNeedsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutCulinarySupplierNeedsInput>;
export const UserUpsertWithoutCulinarySupplierNeedsInputObjectZodSchema = makeSchema();
