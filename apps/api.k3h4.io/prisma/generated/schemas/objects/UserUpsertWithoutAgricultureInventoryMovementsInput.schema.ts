import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUpdateWithoutAgricultureInventoryMovementsInputObjectSchema as UserUpdateWithoutAgricultureInventoryMovementsInputObjectSchema } from './UserUpdateWithoutAgricultureInventoryMovementsInput.schema';
import { UserUncheckedUpdateWithoutAgricultureInventoryMovementsInputObjectSchema as UserUncheckedUpdateWithoutAgricultureInventoryMovementsInputObjectSchema } from './UserUncheckedUpdateWithoutAgricultureInventoryMovementsInput.schema';
import { UserCreateWithoutAgricultureInventoryMovementsInputObjectSchema as UserCreateWithoutAgricultureInventoryMovementsInputObjectSchema } from './UserCreateWithoutAgricultureInventoryMovementsInput.schema';
import { UserUncheckedCreateWithoutAgricultureInventoryMovementsInputObjectSchema as UserUncheckedCreateWithoutAgricultureInventoryMovementsInputObjectSchema } from './UserUncheckedCreateWithoutAgricultureInventoryMovementsInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutAgricultureInventoryMovementsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutAgricultureInventoryMovementsInputObjectSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutAgricultureInventoryMovementsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutAgricultureInventoryMovementsInputObjectSchema)]),
  where: z.lazy(() => UserWhereInputObjectSchema).optional()
}).strict();
export const UserUpsertWithoutAgricultureInventoryMovementsInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutAgricultureInventoryMovementsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutAgricultureInventoryMovementsInput>;
export const UserUpsertWithoutAgricultureInventoryMovementsInputObjectZodSchema = makeSchema();
