import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutCulinarySupplierNeedsInputObjectSchema as UserCreateWithoutCulinarySupplierNeedsInputObjectSchema } from './UserCreateWithoutCulinarySupplierNeedsInput.schema';
import { UserUncheckedCreateWithoutCulinarySupplierNeedsInputObjectSchema as UserUncheckedCreateWithoutCulinarySupplierNeedsInputObjectSchema } from './UserUncheckedCreateWithoutCulinarySupplierNeedsInput.schema';
import { UserCreateOrConnectWithoutCulinarySupplierNeedsInputObjectSchema as UserCreateOrConnectWithoutCulinarySupplierNeedsInputObjectSchema } from './UserCreateOrConnectWithoutCulinarySupplierNeedsInput.schema';
import { UserUpsertWithoutCulinarySupplierNeedsInputObjectSchema as UserUpsertWithoutCulinarySupplierNeedsInputObjectSchema } from './UserUpsertWithoutCulinarySupplierNeedsInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutCulinarySupplierNeedsInputObjectSchema as UserUpdateToOneWithWhereWithoutCulinarySupplierNeedsInputObjectSchema } from './UserUpdateToOneWithWhereWithoutCulinarySupplierNeedsInput.schema';
import { UserUpdateWithoutCulinarySupplierNeedsInputObjectSchema as UserUpdateWithoutCulinarySupplierNeedsInputObjectSchema } from './UserUpdateWithoutCulinarySupplierNeedsInput.schema';
import { UserUncheckedUpdateWithoutCulinarySupplierNeedsInputObjectSchema as UserUncheckedUpdateWithoutCulinarySupplierNeedsInputObjectSchema } from './UserUncheckedUpdateWithoutCulinarySupplierNeedsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutCulinarySupplierNeedsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutCulinarySupplierNeedsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCulinarySupplierNeedsInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutCulinarySupplierNeedsInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutCulinarySupplierNeedsInputObjectSchema), z.lazy(() => UserUpdateWithoutCulinarySupplierNeedsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutCulinarySupplierNeedsInputObjectSchema)]).optional()
}).strict();
export const UserUpdateOneRequiredWithoutCulinarySupplierNeedsNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutCulinarySupplierNeedsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneRequiredWithoutCulinarySupplierNeedsNestedInput>;
export const UserUpdateOneRequiredWithoutCulinarySupplierNeedsNestedInputObjectZodSchema = makeSchema();
