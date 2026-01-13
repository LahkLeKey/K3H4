import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutPosTicketsInputObjectSchema as UserCreateWithoutPosTicketsInputObjectSchema } from './UserCreateWithoutPosTicketsInput.schema';
import { UserUncheckedCreateWithoutPosTicketsInputObjectSchema as UserUncheckedCreateWithoutPosTicketsInputObjectSchema } from './UserUncheckedCreateWithoutPosTicketsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutPosTicketsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutPosTicketsInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutPosTicketsInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutPosTicketsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutPosTicketsInput>;
export const UserCreateOrConnectWithoutPosTicketsInputObjectZodSchema = makeSchema();
