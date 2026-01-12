import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUpdateWithoutAgricultureSlotsInputObjectSchema as UserUpdateWithoutAgricultureSlotsInputObjectSchema } from './UserUpdateWithoutAgricultureSlotsInput.schema';
import { UserUncheckedUpdateWithoutAgricultureSlotsInputObjectSchema as UserUncheckedUpdateWithoutAgricultureSlotsInputObjectSchema } from './UserUncheckedUpdateWithoutAgricultureSlotsInput.schema';
import { UserCreateWithoutAgricultureSlotsInputObjectSchema as UserCreateWithoutAgricultureSlotsInputObjectSchema } from './UserCreateWithoutAgricultureSlotsInput.schema';
import { UserUncheckedCreateWithoutAgricultureSlotsInputObjectSchema as UserUncheckedCreateWithoutAgricultureSlotsInputObjectSchema } from './UserUncheckedCreateWithoutAgricultureSlotsInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutAgricultureSlotsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutAgricultureSlotsInputObjectSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutAgricultureSlotsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutAgricultureSlotsInputObjectSchema)]),
  where: z.lazy(() => UserWhereInputObjectSchema).optional()
}).strict();
export const UserUpsertWithoutAgricultureSlotsInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutAgricultureSlotsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutAgricultureSlotsInput>;
export const UserUpsertWithoutAgricultureSlotsInputObjectZodSchema = makeSchema();
