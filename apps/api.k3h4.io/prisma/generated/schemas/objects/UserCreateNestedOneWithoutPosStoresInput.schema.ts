import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutPosStoresInputObjectSchema as UserCreateWithoutPosStoresInputObjectSchema } from './UserCreateWithoutPosStoresInput.schema';
import { UserUncheckedCreateWithoutPosStoresInputObjectSchema as UserUncheckedCreateWithoutPosStoresInputObjectSchema } from './UserUncheckedCreateWithoutPosStoresInput.schema';
import { UserCreateOrConnectWithoutPosStoresInputObjectSchema as UserCreateOrConnectWithoutPosStoresInputObjectSchema } from './UserCreateOrConnectWithoutPosStoresInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutPosStoresInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutPosStoresInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPosStoresInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutPosStoresInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutPosStoresInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutPosStoresInput>;
export const UserCreateNestedOneWithoutPosStoresInputObjectZodSchema = makeSchema();
