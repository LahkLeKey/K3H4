import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutCulinarySupplierNeedsInputObjectSchema as UserCreateWithoutCulinarySupplierNeedsInputObjectSchema } from './UserCreateWithoutCulinarySupplierNeedsInput.schema';
import { UserUncheckedCreateWithoutCulinarySupplierNeedsInputObjectSchema as UserUncheckedCreateWithoutCulinarySupplierNeedsInputObjectSchema } from './UserUncheckedCreateWithoutCulinarySupplierNeedsInput.schema';
import { UserCreateOrConnectWithoutCulinarySupplierNeedsInputObjectSchema as UserCreateOrConnectWithoutCulinarySupplierNeedsInputObjectSchema } from './UserCreateOrConnectWithoutCulinarySupplierNeedsInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutCulinarySupplierNeedsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutCulinarySupplierNeedsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCulinarySupplierNeedsInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutCulinarySupplierNeedsInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutCulinarySupplierNeedsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutCulinarySupplierNeedsInput>;
export const UserCreateNestedOneWithoutCulinarySupplierNeedsInputObjectZodSchema = makeSchema();
