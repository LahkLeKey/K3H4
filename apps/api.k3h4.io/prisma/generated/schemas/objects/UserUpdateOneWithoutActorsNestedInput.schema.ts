import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutActorsInputObjectSchema as UserCreateWithoutActorsInputObjectSchema } from './UserCreateWithoutActorsInput.schema';
import { UserUncheckedCreateWithoutActorsInputObjectSchema as UserUncheckedCreateWithoutActorsInputObjectSchema } from './UserUncheckedCreateWithoutActorsInput.schema';
import { UserCreateOrConnectWithoutActorsInputObjectSchema as UserCreateOrConnectWithoutActorsInputObjectSchema } from './UserCreateOrConnectWithoutActorsInput.schema';
import { UserUpsertWithoutActorsInputObjectSchema as UserUpsertWithoutActorsInputObjectSchema } from './UserUpsertWithoutActorsInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutActorsInputObjectSchema as UserUpdateToOneWithWhereWithoutActorsInputObjectSchema } from './UserUpdateToOneWithWhereWithoutActorsInput.schema';
import { UserUpdateWithoutActorsInputObjectSchema as UserUpdateWithoutActorsInputObjectSchema } from './UserUpdateWithoutActorsInput.schema';
import { UserUncheckedUpdateWithoutActorsInputObjectSchema as UserUncheckedUpdateWithoutActorsInputObjectSchema } from './UserUncheckedUpdateWithoutActorsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutActorsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutActorsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutActorsInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutActorsInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => UserWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => UserWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutActorsInputObjectSchema), z.lazy(() => UserUpdateWithoutActorsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutActorsInputObjectSchema)]).optional()
}).strict();
export const UserUpdateOneWithoutActorsNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneWithoutActorsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneWithoutActorsNestedInput>;
export const UserUpdateOneWithoutActorsNestedInputObjectZodSchema = makeSchema();
