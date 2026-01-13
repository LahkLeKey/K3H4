import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUpdateWithoutArcadeSessionsInputObjectSchema as UserUpdateWithoutArcadeSessionsInputObjectSchema } from './UserUpdateWithoutArcadeSessionsInput.schema';
import { UserUncheckedUpdateWithoutArcadeSessionsInputObjectSchema as UserUncheckedUpdateWithoutArcadeSessionsInputObjectSchema } from './UserUncheckedUpdateWithoutArcadeSessionsInput.schema';
import { UserCreateWithoutArcadeSessionsInputObjectSchema as UserCreateWithoutArcadeSessionsInputObjectSchema } from './UserCreateWithoutArcadeSessionsInput.schema';
import { UserUncheckedCreateWithoutArcadeSessionsInputObjectSchema as UserUncheckedCreateWithoutArcadeSessionsInputObjectSchema } from './UserUncheckedCreateWithoutArcadeSessionsInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutArcadeSessionsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutArcadeSessionsInputObjectSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutArcadeSessionsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutArcadeSessionsInputObjectSchema)]),
  where: z.lazy(() => UserWhereInputObjectSchema).optional()
}).strict();
export const UserUpsertWithoutArcadeSessionsInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutArcadeSessionsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutArcadeSessionsInput>;
export const UserUpsertWithoutArcadeSessionsInputObjectZodSchema = makeSchema();
