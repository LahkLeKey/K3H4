import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutPosStoresInputObjectSchema as UserUpdateWithoutPosStoresInputObjectSchema } from './UserUpdateWithoutPosStoresInput.schema';
import { UserUncheckedUpdateWithoutPosStoresInputObjectSchema as UserUncheckedUpdateWithoutPosStoresInputObjectSchema } from './UserUncheckedUpdateWithoutPosStoresInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutPosStoresInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutPosStoresInputObjectSchema)])
}).strict();
export const UserUpdateToOneWithWhereWithoutPosStoresInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutPosStoresInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutPosStoresInput>;
export const UserUpdateToOneWithWhereWithoutPosStoresInputObjectZodSchema = makeSchema();
