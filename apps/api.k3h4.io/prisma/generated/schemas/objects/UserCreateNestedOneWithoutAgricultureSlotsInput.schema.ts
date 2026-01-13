import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutAgricultureSlotsInputObjectSchema as UserCreateWithoutAgricultureSlotsInputObjectSchema } from './UserCreateWithoutAgricultureSlotsInput.schema';
import { UserUncheckedCreateWithoutAgricultureSlotsInputObjectSchema as UserUncheckedCreateWithoutAgricultureSlotsInputObjectSchema } from './UserUncheckedCreateWithoutAgricultureSlotsInput.schema';
import { UserCreateOrConnectWithoutAgricultureSlotsInputObjectSchema as UserCreateOrConnectWithoutAgricultureSlotsInputObjectSchema } from './UserCreateOrConnectWithoutAgricultureSlotsInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutAgricultureSlotsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutAgricultureSlotsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAgricultureSlotsInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutAgricultureSlotsInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAgricultureSlotsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutAgricultureSlotsInput>;
export const UserCreateNestedOneWithoutAgricultureSlotsInputObjectZodSchema = makeSchema();
