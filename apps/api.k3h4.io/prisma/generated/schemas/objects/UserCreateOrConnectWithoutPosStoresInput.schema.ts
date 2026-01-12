import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutPosStoresInputObjectSchema as UserCreateWithoutPosStoresInputObjectSchema } from './UserCreateWithoutPosStoresInput.schema';
import { UserUncheckedCreateWithoutPosStoresInputObjectSchema as UserUncheckedCreateWithoutPosStoresInputObjectSchema } from './UserUncheckedCreateWithoutPosStoresInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutPosStoresInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutPosStoresInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutPosStoresInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutPosStoresInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutPosStoresInput>;
export const UserCreateOrConnectWithoutPosStoresInputObjectZodSchema = makeSchema();
