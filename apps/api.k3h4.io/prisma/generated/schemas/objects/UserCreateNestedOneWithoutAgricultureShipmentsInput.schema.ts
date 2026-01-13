import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutAgricultureShipmentsInputObjectSchema as UserCreateWithoutAgricultureShipmentsInputObjectSchema } from './UserCreateWithoutAgricultureShipmentsInput.schema';
import { UserUncheckedCreateWithoutAgricultureShipmentsInputObjectSchema as UserUncheckedCreateWithoutAgricultureShipmentsInputObjectSchema } from './UserUncheckedCreateWithoutAgricultureShipmentsInput.schema';
import { UserCreateOrConnectWithoutAgricultureShipmentsInputObjectSchema as UserCreateOrConnectWithoutAgricultureShipmentsInputObjectSchema } from './UserCreateOrConnectWithoutAgricultureShipmentsInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutAgricultureShipmentsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutAgricultureShipmentsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAgricultureShipmentsInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutAgricultureShipmentsInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAgricultureShipmentsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutAgricultureShipmentsInput>;
export const UserCreateNestedOneWithoutAgricultureShipmentsInputObjectZodSchema = makeSchema();
