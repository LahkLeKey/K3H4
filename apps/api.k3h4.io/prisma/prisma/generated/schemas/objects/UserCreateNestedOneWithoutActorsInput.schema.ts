import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutActorsInputObjectSchema as UserCreateWithoutActorsInputObjectSchema } from './UserCreateWithoutActorsInput.schema';
import { UserUncheckedCreateWithoutActorsInputObjectSchema as UserUncheckedCreateWithoutActorsInputObjectSchema } from './UserUncheckedCreateWithoutActorsInput.schema';
import { UserCreateOrConnectWithoutActorsInputObjectSchema as UserCreateOrConnectWithoutActorsInputObjectSchema } from './UserCreateOrConnectWithoutActorsInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutActorsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutActorsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutActorsInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutActorsInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutActorsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutActorsInput>;
export const UserCreateNestedOneWithoutActorsInputObjectZodSchema = makeSchema();
