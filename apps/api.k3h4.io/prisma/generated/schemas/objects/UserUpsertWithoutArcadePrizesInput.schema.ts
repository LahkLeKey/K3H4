import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUpdateWithoutArcadePrizesInputObjectSchema as UserUpdateWithoutArcadePrizesInputObjectSchema } from './UserUpdateWithoutArcadePrizesInput.schema';
import { UserUncheckedUpdateWithoutArcadePrizesInputObjectSchema as UserUncheckedUpdateWithoutArcadePrizesInputObjectSchema } from './UserUncheckedUpdateWithoutArcadePrizesInput.schema';
import { UserCreateWithoutArcadePrizesInputObjectSchema as UserCreateWithoutArcadePrizesInputObjectSchema } from './UserCreateWithoutArcadePrizesInput.schema';
import { UserUncheckedCreateWithoutArcadePrizesInputObjectSchema as UserUncheckedCreateWithoutArcadePrizesInputObjectSchema } from './UserUncheckedCreateWithoutArcadePrizesInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutArcadePrizesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutArcadePrizesInputObjectSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutArcadePrizesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutArcadePrizesInputObjectSchema)]),
  where: z.lazy(() => UserWhereInputObjectSchema).optional()
}).strict();
export const UserUpsertWithoutArcadePrizesInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutArcadePrizesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutArcadePrizesInput>;
export const UserUpsertWithoutArcadePrizesInputObjectZodSchema = makeSchema();
