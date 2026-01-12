import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutAgricultureInventoryMovementsInputObjectSchema as UserCreateWithoutAgricultureInventoryMovementsInputObjectSchema } from './UserCreateWithoutAgricultureInventoryMovementsInput.schema';
import { UserUncheckedCreateWithoutAgricultureInventoryMovementsInputObjectSchema as UserUncheckedCreateWithoutAgricultureInventoryMovementsInputObjectSchema } from './UserUncheckedCreateWithoutAgricultureInventoryMovementsInput.schema';
import { UserCreateOrConnectWithoutAgricultureInventoryMovementsInputObjectSchema as UserCreateOrConnectWithoutAgricultureInventoryMovementsInputObjectSchema } from './UserCreateOrConnectWithoutAgricultureInventoryMovementsInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutAgricultureInventoryMovementsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutAgricultureInventoryMovementsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAgricultureInventoryMovementsInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutAgricultureInventoryMovementsInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAgricultureInventoryMovementsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutAgricultureInventoryMovementsInput>;
export const UserCreateNestedOneWithoutAgricultureInventoryMovementsInputObjectZodSchema = makeSchema();
