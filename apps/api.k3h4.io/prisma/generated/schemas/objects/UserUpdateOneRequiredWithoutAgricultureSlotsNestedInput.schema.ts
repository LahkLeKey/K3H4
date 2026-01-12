import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutAgricultureSlotsInputObjectSchema as UserCreateWithoutAgricultureSlotsInputObjectSchema } from './UserCreateWithoutAgricultureSlotsInput.schema';
import { UserUncheckedCreateWithoutAgricultureSlotsInputObjectSchema as UserUncheckedCreateWithoutAgricultureSlotsInputObjectSchema } from './UserUncheckedCreateWithoutAgricultureSlotsInput.schema';
import { UserCreateOrConnectWithoutAgricultureSlotsInputObjectSchema as UserCreateOrConnectWithoutAgricultureSlotsInputObjectSchema } from './UserCreateOrConnectWithoutAgricultureSlotsInput.schema';
import { UserUpsertWithoutAgricultureSlotsInputObjectSchema as UserUpsertWithoutAgricultureSlotsInputObjectSchema } from './UserUpsertWithoutAgricultureSlotsInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutAgricultureSlotsInputObjectSchema as UserUpdateToOneWithWhereWithoutAgricultureSlotsInputObjectSchema } from './UserUpdateToOneWithWhereWithoutAgricultureSlotsInput.schema';
import { UserUpdateWithoutAgricultureSlotsInputObjectSchema as UserUpdateWithoutAgricultureSlotsInputObjectSchema } from './UserUpdateWithoutAgricultureSlotsInput.schema';
import { UserUncheckedUpdateWithoutAgricultureSlotsInputObjectSchema as UserUncheckedUpdateWithoutAgricultureSlotsInputObjectSchema } from './UserUncheckedUpdateWithoutAgricultureSlotsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutAgricultureSlotsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutAgricultureSlotsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAgricultureSlotsInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAgricultureSlotsInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutAgricultureSlotsInputObjectSchema), z.lazy(() => UserUpdateWithoutAgricultureSlotsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutAgricultureSlotsInputObjectSchema)]).optional()
}).strict();
export const UserUpdateOneRequiredWithoutAgricultureSlotsNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAgricultureSlotsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneRequiredWithoutAgricultureSlotsNestedInput>;
export const UserUpdateOneRequiredWithoutAgricultureSlotsNestedInputObjectZodSchema = makeSchema();
