import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutAgricultureShipmentsInputObjectSchema as UserUpdateWithoutAgricultureShipmentsInputObjectSchema } from './UserUpdateWithoutAgricultureShipmentsInput.schema';
import { UserUncheckedUpdateWithoutAgricultureShipmentsInputObjectSchema as UserUncheckedUpdateWithoutAgricultureShipmentsInputObjectSchema } from './UserUncheckedUpdateWithoutAgricultureShipmentsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutAgricultureShipmentsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutAgricultureShipmentsInputObjectSchema)])
}).strict();
export const UserUpdateToOneWithWhereWithoutAgricultureShipmentsInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAgricultureShipmentsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAgricultureShipmentsInput>;
export const UserUpdateToOneWithWhereWithoutAgricultureShipmentsInputObjectZodSchema = makeSchema();
