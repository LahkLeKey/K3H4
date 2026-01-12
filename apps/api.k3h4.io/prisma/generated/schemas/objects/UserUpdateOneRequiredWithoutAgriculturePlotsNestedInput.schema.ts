import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutAgriculturePlotsInputObjectSchema as UserCreateWithoutAgriculturePlotsInputObjectSchema } from './UserCreateWithoutAgriculturePlotsInput.schema';
import { UserUncheckedCreateWithoutAgriculturePlotsInputObjectSchema as UserUncheckedCreateWithoutAgriculturePlotsInputObjectSchema } from './UserUncheckedCreateWithoutAgriculturePlotsInput.schema';
import { UserCreateOrConnectWithoutAgriculturePlotsInputObjectSchema as UserCreateOrConnectWithoutAgriculturePlotsInputObjectSchema } from './UserCreateOrConnectWithoutAgriculturePlotsInput.schema';
import { UserUpsertWithoutAgriculturePlotsInputObjectSchema as UserUpsertWithoutAgriculturePlotsInputObjectSchema } from './UserUpsertWithoutAgriculturePlotsInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutAgriculturePlotsInputObjectSchema as UserUpdateToOneWithWhereWithoutAgriculturePlotsInputObjectSchema } from './UserUpdateToOneWithWhereWithoutAgriculturePlotsInput.schema';
import { UserUpdateWithoutAgriculturePlotsInputObjectSchema as UserUpdateWithoutAgriculturePlotsInputObjectSchema } from './UserUpdateWithoutAgriculturePlotsInput.schema';
import { UserUncheckedUpdateWithoutAgriculturePlotsInputObjectSchema as UserUncheckedUpdateWithoutAgriculturePlotsInputObjectSchema } from './UserUncheckedUpdateWithoutAgriculturePlotsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutAgriculturePlotsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutAgriculturePlotsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAgriculturePlotsInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAgriculturePlotsInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutAgriculturePlotsInputObjectSchema), z.lazy(() => UserUpdateWithoutAgriculturePlotsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutAgriculturePlotsInputObjectSchema)]).optional()
}).strict();
export const UserUpdateOneRequiredWithoutAgriculturePlotsNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAgriculturePlotsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneRequiredWithoutAgriculturePlotsNestedInput>;
export const UserUpdateOneRequiredWithoutAgriculturePlotsNestedInputObjectZodSchema = makeSchema();
