import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUpdateWithoutAgricultureInventoriesInputObjectSchema as UserUpdateWithoutAgricultureInventoriesInputObjectSchema } from './UserUpdateWithoutAgricultureInventoriesInput.schema';
import { UserUncheckedUpdateWithoutAgricultureInventoriesInputObjectSchema as UserUncheckedUpdateWithoutAgricultureInventoriesInputObjectSchema } from './UserUncheckedUpdateWithoutAgricultureInventoriesInput.schema';
import { UserCreateWithoutAgricultureInventoriesInputObjectSchema as UserCreateWithoutAgricultureInventoriesInputObjectSchema } from './UserCreateWithoutAgricultureInventoriesInput.schema';
import { UserUncheckedCreateWithoutAgricultureInventoriesInputObjectSchema as UserUncheckedCreateWithoutAgricultureInventoriesInputObjectSchema } from './UserUncheckedCreateWithoutAgricultureInventoriesInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutAgricultureInventoriesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutAgricultureInventoriesInputObjectSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutAgricultureInventoriesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutAgricultureInventoriesInputObjectSchema)]),
  where: z.lazy(() => UserWhereInputObjectSchema).optional()
}).strict();
export const UserUpsertWithoutAgricultureInventoriesInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutAgricultureInventoriesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutAgricultureInventoriesInput>;
export const UserUpsertWithoutAgricultureInventoriesInputObjectZodSchema = makeSchema();
