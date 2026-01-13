import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutAgricultureShipmentsInputObjectSchema as UserCreateWithoutAgricultureShipmentsInputObjectSchema } from './UserCreateWithoutAgricultureShipmentsInput.schema';
import { UserUncheckedCreateWithoutAgricultureShipmentsInputObjectSchema as UserUncheckedCreateWithoutAgricultureShipmentsInputObjectSchema } from './UserUncheckedCreateWithoutAgricultureShipmentsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutAgricultureShipmentsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutAgricultureShipmentsInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutAgricultureShipmentsInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAgricultureShipmentsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutAgricultureShipmentsInput>;
export const UserCreateOrConnectWithoutAgricultureShipmentsInputObjectZodSchema = makeSchema();
