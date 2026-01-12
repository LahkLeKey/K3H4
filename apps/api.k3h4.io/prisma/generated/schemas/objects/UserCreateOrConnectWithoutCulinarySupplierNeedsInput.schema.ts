import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutCulinarySupplierNeedsInputObjectSchema as UserCreateWithoutCulinarySupplierNeedsInputObjectSchema } from './UserCreateWithoutCulinarySupplierNeedsInput.schema';
import { UserUncheckedCreateWithoutCulinarySupplierNeedsInputObjectSchema as UserUncheckedCreateWithoutCulinarySupplierNeedsInputObjectSchema } from './UserUncheckedCreateWithoutCulinarySupplierNeedsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutCulinarySupplierNeedsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutCulinarySupplierNeedsInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutCulinarySupplierNeedsInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutCulinarySupplierNeedsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutCulinarySupplierNeedsInput>;
export const UserCreateOrConnectWithoutCulinarySupplierNeedsInputObjectZodSchema = makeSchema();
