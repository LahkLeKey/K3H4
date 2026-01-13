import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUpdateWithoutPersonasInputObjectSchema as UserUpdateWithoutPersonasInputObjectSchema } from './UserUpdateWithoutPersonasInput.schema';
import { UserUncheckedUpdateWithoutPersonasInputObjectSchema as UserUncheckedUpdateWithoutPersonasInputObjectSchema } from './UserUncheckedUpdateWithoutPersonasInput.schema';
import { UserCreateWithoutPersonasInputObjectSchema as UserCreateWithoutPersonasInputObjectSchema } from './UserCreateWithoutPersonasInput.schema';
import { UserUncheckedCreateWithoutPersonasInputObjectSchema as UserUncheckedCreateWithoutPersonasInputObjectSchema } from './UserUncheckedCreateWithoutPersonasInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutPersonasInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutPersonasInputObjectSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutPersonasInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutPersonasInputObjectSchema)]),
  where: z.lazy(() => UserWhereInputObjectSchema).optional()
}).strict();
export const UserUpsertWithoutPersonasInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutPersonasInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutPersonasInput>;
export const UserUpsertWithoutPersonasInputObjectZodSchema = makeSchema();
