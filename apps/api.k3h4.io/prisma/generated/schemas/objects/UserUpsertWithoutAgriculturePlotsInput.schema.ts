import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUpdateWithoutAgriculturePlotsInputObjectSchema as UserUpdateWithoutAgriculturePlotsInputObjectSchema } from './UserUpdateWithoutAgriculturePlotsInput.schema';
import { UserUncheckedUpdateWithoutAgriculturePlotsInputObjectSchema as UserUncheckedUpdateWithoutAgriculturePlotsInputObjectSchema } from './UserUncheckedUpdateWithoutAgriculturePlotsInput.schema';
import { UserCreateWithoutAgriculturePlotsInputObjectSchema as UserCreateWithoutAgriculturePlotsInputObjectSchema } from './UserCreateWithoutAgriculturePlotsInput.schema';
import { UserUncheckedCreateWithoutAgriculturePlotsInputObjectSchema as UserUncheckedCreateWithoutAgriculturePlotsInputObjectSchema } from './UserUncheckedCreateWithoutAgriculturePlotsInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutAgriculturePlotsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutAgriculturePlotsInputObjectSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutAgriculturePlotsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutAgriculturePlotsInputObjectSchema)]),
  where: z.lazy(() => UserWhereInputObjectSchema).optional()
}).strict();
export const UserUpsertWithoutAgriculturePlotsInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutAgriculturePlotsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutAgriculturePlotsInput>;
export const UserUpsertWithoutAgriculturePlotsInputObjectZodSchema = makeSchema();
