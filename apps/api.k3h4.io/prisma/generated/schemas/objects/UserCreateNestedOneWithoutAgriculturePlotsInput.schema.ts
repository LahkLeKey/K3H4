import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutAgriculturePlotsInputObjectSchema as UserCreateWithoutAgriculturePlotsInputObjectSchema } from './UserCreateWithoutAgriculturePlotsInput.schema';
import { UserUncheckedCreateWithoutAgriculturePlotsInputObjectSchema as UserUncheckedCreateWithoutAgriculturePlotsInputObjectSchema } from './UserUncheckedCreateWithoutAgriculturePlotsInput.schema';
import { UserCreateOrConnectWithoutAgriculturePlotsInputObjectSchema as UserCreateOrConnectWithoutAgriculturePlotsInputObjectSchema } from './UserCreateOrConnectWithoutAgriculturePlotsInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutAgriculturePlotsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutAgriculturePlotsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAgriculturePlotsInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutAgriculturePlotsInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAgriculturePlotsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutAgriculturePlotsInput>;
export const UserCreateNestedOneWithoutAgriculturePlotsInputObjectZodSchema = makeSchema();
