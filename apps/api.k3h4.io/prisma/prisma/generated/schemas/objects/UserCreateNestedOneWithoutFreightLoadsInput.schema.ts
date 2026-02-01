import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutFreightLoadsInputObjectSchema as UserCreateWithoutFreightLoadsInputObjectSchema } from './UserCreateWithoutFreightLoadsInput.schema';
import { UserUncheckedCreateWithoutFreightLoadsInputObjectSchema as UserUncheckedCreateWithoutFreightLoadsInputObjectSchema } from './UserUncheckedCreateWithoutFreightLoadsInput.schema';
import { UserCreateOrConnectWithoutFreightLoadsInputObjectSchema as UserCreateOrConnectWithoutFreightLoadsInputObjectSchema } from './UserCreateOrConnectWithoutFreightLoadsInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutFreightLoadsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutFreightLoadsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutFreightLoadsInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutFreightLoadsInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutFreightLoadsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutFreightLoadsInput>;
export const UserCreateNestedOneWithoutFreightLoadsInputObjectZodSchema = makeSchema();
