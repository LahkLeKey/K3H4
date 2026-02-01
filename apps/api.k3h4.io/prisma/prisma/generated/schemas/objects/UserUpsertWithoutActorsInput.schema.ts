import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUpdateWithoutActorsInputObjectSchema as UserUpdateWithoutActorsInputObjectSchema } from './UserUpdateWithoutActorsInput.schema';
import { UserUncheckedUpdateWithoutActorsInputObjectSchema as UserUncheckedUpdateWithoutActorsInputObjectSchema } from './UserUncheckedUpdateWithoutActorsInput.schema';
import { UserCreateWithoutActorsInputObjectSchema as UserCreateWithoutActorsInputObjectSchema } from './UserCreateWithoutActorsInput.schema';
import { UserUncheckedCreateWithoutActorsInputObjectSchema as UserUncheckedCreateWithoutActorsInputObjectSchema } from './UserUncheckedCreateWithoutActorsInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutActorsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutActorsInputObjectSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutActorsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutActorsInputObjectSchema)]),
  where: z.lazy(() => UserWhereInputObjectSchema).optional()
}).strict();
export const UserUpsertWithoutActorsInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutActorsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutActorsInput>;
export const UserUpsertWithoutActorsInputObjectZodSchema = makeSchema();
