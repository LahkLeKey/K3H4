import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutCulinarySupplierNeedsInputObjectSchema as UserUpdateWithoutCulinarySupplierNeedsInputObjectSchema } from './UserUpdateWithoutCulinarySupplierNeedsInput.schema';
import { UserUncheckedUpdateWithoutCulinarySupplierNeedsInputObjectSchema as UserUncheckedUpdateWithoutCulinarySupplierNeedsInputObjectSchema } from './UserUncheckedUpdateWithoutCulinarySupplierNeedsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutCulinarySupplierNeedsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutCulinarySupplierNeedsInputObjectSchema)])
}).strict();
export const UserUpdateToOneWithWhereWithoutCulinarySupplierNeedsInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutCulinarySupplierNeedsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutCulinarySupplierNeedsInput>;
export const UserUpdateToOneWithWhereWithoutCulinarySupplierNeedsInputObjectZodSchema = makeSchema();
