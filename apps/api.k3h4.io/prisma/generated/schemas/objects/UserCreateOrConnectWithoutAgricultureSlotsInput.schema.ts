import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutAgricultureSlotsInputObjectSchema as UserCreateWithoutAgricultureSlotsInputObjectSchema } from './UserCreateWithoutAgricultureSlotsInput.schema';
import { UserUncheckedCreateWithoutAgricultureSlotsInputObjectSchema as UserUncheckedCreateWithoutAgricultureSlotsInputObjectSchema } from './UserUncheckedCreateWithoutAgricultureSlotsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutAgricultureSlotsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutAgricultureSlotsInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutAgricultureSlotsInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAgricultureSlotsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutAgricultureSlotsInput>;
export const UserCreateOrConnectWithoutAgricultureSlotsInputObjectZodSchema = makeSchema();
