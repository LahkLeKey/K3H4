import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutFreightLoadsInputObjectSchema as UserCreateWithoutFreightLoadsInputObjectSchema } from './UserCreateWithoutFreightLoadsInput.schema';
import { UserUncheckedCreateWithoutFreightLoadsInputObjectSchema as UserUncheckedCreateWithoutFreightLoadsInputObjectSchema } from './UserUncheckedCreateWithoutFreightLoadsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutFreightLoadsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutFreightLoadsInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutFreightLoadsInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutFreightLoadsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutFreightLoadsInput>;
export const UserCreateOrConnectWithoutFreightLoadsInputObjectZodSchema = makeSchema();
