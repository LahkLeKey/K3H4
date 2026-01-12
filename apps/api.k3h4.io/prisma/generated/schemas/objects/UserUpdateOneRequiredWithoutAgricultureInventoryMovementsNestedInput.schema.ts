import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutAgricultureInventoryMovementsInputObjectSchema as UserCreateWithoutAgricultureInventoryMovementsInputObjectSchema } from './UserCreateWithoutAgricultureInventoryMovementsInput.schema';
import { UserUncheckedCreateWithoutAgricultureInventoryMovementsInputObjectSchema as UserUncheckedCreateWithoutAgricultureInventoryMovementsInputObjectSchema } from './UserUncheckedCreateWithoutAgricultureInventoryMovementsInput.schema';
import { UserCreateOrConnectWithoutAgricultureInventoryMovementsInputObjectSchema as UserCreateOrConnectWithoutAgricultureInventoryMovementsInputObjectSchema } from './UserCreateOrConnectWithoutAgricultureInventoryMovementsInput.schema';
import { UserUpsertWithoutAgricultureInventoryMovementsInputObjectSchema as UserUpsertWithoutAgricultureInventoryMovementsInputObjectSchema } from './UserUpsertWithoutAgricultureInventoryMovementsInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutAgricultureInventoryMovementsInputObjectSchema as UserUpdateToOneWithWhereWithoutAgricultureInventoryMovementsInputObjectSchema } from './UserUpdateToOneWithWhereWithoutAgricultureInventoryMovementsInput.schema';
import { UserUpdateWithoutAgricultureInventoryMovementsInputObjectSchema as UserUpdateWithoutAgricultureInventoryMovementsInputObjectSchema } from './UserUpdateWithoutAgricultureInventoryMovementsInput.schema';
import { UserUncheckedUpdateWithoutAgricultureInventoryMovementsInputObjectSchema as UserUncheckedUpdateWithoutAgricultureInventoryMovementsInputObjectSchema } from './UserUncheckedUpdateWithoutAgricultureInventoryMovementsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutAgricultureInventoryMovementsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutAgricultureInventoryMovementsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAgricultureInventoryMovementsInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAgricultureInventoryMovementsInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutAgricultureInventoryMovementsInputObjectSchema), z.lazy(() => UserUpdateWithoutAgricultureInventoryMovementsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutAgricultureInventoryMovementsInputObjectSchema)]).optional()
}).strict();
export const UserUpdateOneRequiredWithoutAgricultureInventoryMovementsNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAgricultureInventoryMovementsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneRequiredWithoutAgricultureInventoryMovementsNestedInput>;
export const UserUpdateOneRequiredWithoutAgricultureInventoryMovementsNestedInputObjectZodSchema = makeSchema();
